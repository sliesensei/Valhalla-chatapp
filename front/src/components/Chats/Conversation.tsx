import {
  Avatar,
  ChatContainer,
  MessageList,
  ConversationHeader,
  MessageInput,
  EllipsisButton,
  Message,
  // @ts-ignore
} from '@chatscope/chat-ui-kit-react';
import { AccountCircle, SupervisedUserCircle } from '@material-ui/icons';

import { makeStyles } from '@material-ui/styles';
import {
  Theme
} from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import server from '../../sockets/useServer';
import Settings from './Settings';
import useSocket from '../../sockets/useSocket';

export interface Props {
  chat: any
}

const useStyles = makeStyles((theme: Theme) => ({
  searchBar: {
    '& .cs-message-input__content-editor-wrapper': {
      border: '1px solid',
      borderColor: theme.palette.divider,
      backgroundColor: `${theme.palette.background.paper} !important`,
      color: `${theme.palette.text.primary} !important`,
      '& .cs-message-input__content-editor::placeholder': {
        color: `${theme.palette.text.primary} !important`,
      },
      "& *": {
        backgroundColor: `${theme.palette.background.paper} !important`,
        color: `${theme.palette.text.primary} !important`,
      }
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
  messageArea: {
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    backgroundColor: theme.palette.background.paper,
  },
  message: {
    color: theme.palette.text.primary,
    borderRadius: '8px 8px 8px 8px',
    '& div': {
      '& div': {
        backgroundColor: `${theme.palette.primary.main} !important`,
        '& div': {
          color: theme.palette.primary.contrastText,
        },
      },
    },
  },
  moreButton: {
    color: theme.palette.primary.main,
  },
  headerActions: {
    gap: '10px',
  },
  formControl: {
    minWidth: '25%',
  },
}))

export default function Conversation({ chat }: Props) {
  const classes = useStyles();
  const me = localStorage.getItem('userId');
  const socket = useSocket();
  const [dialogOpen, setDoalogOpen] = useState<boolean>(false);
  // const reverseList = useMemo(() => [...messageList].reverse(), [messageList])
  const [filtered, setFiltered] = useState<any>([]);
  const [messages, setMessages] = useState<Array<any>>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    server.room(chat._id).messages.then(({ data }) => {
      setMessages(data);
    })
  }, [chat])

  const handleOpenDialog = useCallback(() => {
    setDoalogOpen((prev) => !prev);
  }, [])

  const handleSearch = useCallback((data) => {
    setFiltered(data);
  }, [])

  const handleSend = useCallback(() => {
    socket?.send(chat._id, message);
  }, [chat._id, message, socket])

  useEffect(() => {
    setFiltered(messages)
  }, [messages]);

  const handleMessageReceive = useCallback((newMessage) => {
    if (newMessage.room === chat._id) {
      setMessages(prev => [...prev, newMessage])
    }
  }, [chat._id])

  useEffect(() => {
    socket?.onMessage(handleMessageReceive);
    return () => {
      socket?.offMessage(handleMessageReceive);
    }
  }, [handleMessageReceive, socket])

  const handleChangeMessage = useCallback((value) => {
    setMessage(value);
  }, [])

  return (
    <>
      <Settings room={chat} dialogOpen={dialogOpen} onClose={handleOpenDialog} />
      <ChatContainer username={me} className={classes.container}>
        <ConversationHeader className={classes.header}>
          <Avatar status="available">
            {chat.members.length > 2
              ? <SupervisedUserCircle fontSize="large" color="primary" />
              : <AccountCircle fontSize="large" color="primary" />}
          </Avatar>
          <ConversationHeader.Content userName={chat.name} className={classes.header} />
          <ConversationHeader.Actions className={classes.headerActions}>
            <Searchbar
              keys={['message']}
              placeholder="Search for a message..."
              onSearch={handleSearch}
              data={messages}
            />
            <EllipsisButton orientation="vertical" className={classes.moreButton} onClick={handleOpenDialog}>

            </EllipsisButton>
          </ConversationHeader.Actions>
        </ConversationHeader>
        <MessageList username={me} className={classes.messageArea}>
          {filtered.map((message: any) => (
            <Message
              key={JSON.stringify(message)}
              className={classes.message}
              model={{
                message: message.message,
                sentTime: message.created_at,
                sender: message.user,
                direction: message.user === me ? 'outgoing' : 'incoming',
              }}
            />
          ))}
        </MessageList>
        <MessageInput
          onChange={handleChangeMessage}
          onSend={handleSend}
          placeholder="Type your message here..."
          attachDisabled
          className={classes.searchBar} />
      </ChatContainer>
    </>
  )
}
