import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  Avatar,
  MainContainer,
  ConversationList,
  ConversationHeader,
  Conversation as ConversationPreview,
  Sidebar,
  // @ts-ignore
} from '@chatscope/chat-ui-kit-react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, TextField } from '@material-ui/core';
import { AccountCircle, AddOutlined, SupervisedUserCircle } from '@material-ui/icons';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Conversation from '../components/Chats/Conversation';
import Searchbar from '../components/Chats/Searchbar';
import withContainer from '../hooks/withContainer';
import server from '../sockets/useServer';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router';
import useSocket from '../sockets/useSocket';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.divider,
  },
  sidebar: {
    backgroundColor: theme.palette.background.paper,
    width: '25%',
  },
  conversationPreview: {
    '& div': {
      color: theme.palette.text.primary,
    },
  },
  searchBar: {
    '& input': {
      '&::placeholder': {
        color: `${theme.palette.text.primary} !important`,
      },
      backgroundColor: `${theme.palette.background.paper} !important`,
      color: `${theme.palette.text.primary} !important`,
    },
    '& svg': {
      color: `${theme.palette.primary.main} !important`,
    },
    border: '1px solid',
    borderColor: theme.palette.divider,
    backgroundColor: `${theme.palette.background.paper} !important`,
    color: theme.palette.text.primary,
  },
  header: {
    '& div': {
      backgroundColor: `${theme.palette.background.paper} !important`,
      color: `${theme.palette.text.primary} !important`,
    },
    backgroundColor: theme.palette.background.paper,
  },
  headerActions: {
    gap: '10px',
  },
  empty: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.primary.main,
  },
  dialogTitle: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  dialogContent: {
  },
}))

class Form {
  roomName?: string
}

function Chats() {
  const classes = useStyles();
  const [data, setData] = useState<Array<any>>([]);
  const [currentChat, setCurrentChat] = useState<any>()
  const [filtered, setFiltered] = useState<Array<any>>([]);
  const [notifs, setNotifs] = useState<{ [k: string]: number }>({});
  const { enqueueSnackbar } = useSnackbar();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const socket = useSocket();
  // const { enqueueSnackbar } = useSnackbar()
  const [form, setForm] = useState(new Form())
  const handleChange = useCallback(({ target: { name, value } }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (name) {
      setForm((prevState) => ({ ...prevState, [name]: value }))
    }
  }, [])


  const handleChangeCurrentChat = useCallback((chat: any) => () => {
    setCurrentChat(chat);
  }, []);

  const handleSearch = useCallback((newData) => {
    console.log(newData)
    setFiltered(newData);
  }, []);

  const refreshRoomList = useCallback(() => {
    server.rooms.getAll().then((res) => {
      setData(res.data)
    })
  }, [])

  const handleSubmit = useCallback(() => {
    const { roomName } = form;
    if (roomName) server.rooms.create(roomName).then(({ data, variant }: any) => {
      enqueueSnackbar(data?.message ?? 'Error', { variant })
      refreshRoomList();
    });
    setDialogOpen(false);
  }, [enqueueSnackbar, form, refreshRoomList]);

  useEffect(() => {
    refreshRoomList();
  }, [refreshRoomList]);

  const handleAddNotif = useCallback((newMessage) => {
    console.log(newMessage)
    if (newMessage.room !== currentChat?._id) {
      setNotifs(prev => ({
        ...prev, [newMessage.room]: (prev[newMessage.room] ?? 0) + 1,
      }))
    }
  }, [currentChat])

  useEffect(() => {
    socket?.onMessage(handleAddNotif);
    return () => {
      socket?.offMessage(handleAddNotif);
    }
  }, [handleAddNotif, socket])

  useEffect(() => {
    if (currentChat) {
      setNotifs(prev => ({ ...prev, [currentChat._id]: 0 }))
    }
  }, [currentChat]);

  useEffect(() => {
    setFiltered(data)
  }, [data]);

  return (
    <>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle title="Sign In" className={classes.dialogTitle}>Create Room</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField fullWidth label="Room Name" name="roomName" onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button color="default" onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button color="primary" onClick={handleSubmit}>Create Room</Button>
        </DialogActions>
      </Dialog>
      <MainContainer className={classes.container}>
        <Sidebar loading={!data} position="left" className={classes.sidebar}>
          <ConversationHeader className={classes.header}>
            <ConversationHeader.Content>
              <Searchbar
                keys={['name']}
                placeholder="Search for a conversation..."
                onSearch={handleSearch}
                data={data}
              />
            </ConversationHeader.Content>
            <ConversationHeader.Actions className={classes.headerActions}>
              <IconButton>
                <AddOutlined color="primary" onClick={() => { setDialogOpen(prev => !prev) }} />
              </IconButton>
            </ConversationHeader.Actions>
          </ConversationHeader>
          <ConversationList>
            {filtered.map((chat: any) => (
              <ConversationPreview
                unreadCnt={notifs[chat._id]}
                onClick={handleChangeCurrentChat(chat)}
                key={chat._id}
                className={classes.conversationPreview}
              >
                <Avatar name={chat.name} status="available">
                  {chat.members.length > 2
                    ? <SupervisedUserCircle fontSize="large" color="primary" />
                    : <AccountCircle fontSize="large" color="primary" />}
                </Avatar>
                <ConversationPreview.Content name={chat.name} className={classes.conversationPreview} />
              </ConversationPreview>
            ))}
          </ConversationList>
        </Sidebar>
        {currentChat && <Conversation chat={currentChat} />}
      </MainContainer>
    </>
  )
}

export default withContainer(Chats);