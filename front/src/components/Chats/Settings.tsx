import {
  Button,
  Dialog,
  DialogActions,
  DialogContent, DialogTitle, Divider, makeStyles, TextField, Theme, Typography
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { ChangeEvent, useCallback, useDebugValue, useState } from 'react';
import server from '../../sockets/useServer';

interface Props {
  dialogOpen: boolean
  room: any
  onClose: any
}

const useStyles = makeStyles((theme: Theme) => ({
  dialogTitle: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  dialogContent: {
    padding: theme.spacing(3)
  },
  contentSection: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  divider: {
    margin: theme.spacing(3),
  },
  leaveButton: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.error.light,
    }
  }
}))

export default function Settings({ dialogOpen, room, onClose }: Props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [inviteName, setInviteName] = useState('');
  const handleInvite = useCallback(() => {
    server.room(room._id).invite(inviteName).then(({ data, variant }: any) => {
      enqueueSnackbar(data.message, { variant })
    });
  }, [enqueueSnackbar, inviteName, room._id])

  const handleChangeInviteName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInviteName(e.target.value)
  }, [])

  return (
    <Dialog
      fullWidth
      onClose={onClose}
      open={dialogOpen}
      maxWidth="md"
    >
      <DialogTitle title="Chat Settings" className={classes.dialogTitle}>Chat Settings</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <div className={classes.contentSection}>
          <Typography variant="h4">Invite someone</Typography>
          <TextField onChange={handleChangeInviteName} />
          <Button color="primary" variant="contained" onClick={handleInvite}>Invite</Button>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.contentSection}>
          <Typography variant="h4">Promote admin</Typography>
          <Button color="primary" variant="contained">Promote</Button>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.contentSection}>
          <Typography variant="h4">Leave Room </Typography>
          <Button onClick={() => { server.room(room._id).leave.finally(() => { }) }} className={classes.leaveButton} variant="contained">Leave</Button>
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>Done</Button>
      </DialogActions>
    </Dialog>
  )
}