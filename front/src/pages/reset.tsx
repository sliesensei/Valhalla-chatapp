import {
  Button,
  Dialog,
  DialogActions,
  DialogContent, DialogTitle, makeStyles, TextField, Theme
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ChangeEvent, useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import server from '../sockets/useServer';

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

export default function Reset({ dialogOpen, room, onClose }: Props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [inviteName, setInviteName] = useState('');

  const handleChangeInviteName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInviteName(e.target.value)
  }, [])

  const handleAskLink = useCallback(() => {
    server.reset(inviteName).then(({ data, variant }: any) => {
      enqueueSnackbar(data?.message, { variant })
    })
  }, [enqueueSnackbar, inviteName])

  return (
    <Dialog
      fullWidth
      open
      maxWidth="sm"
    >
      <DialogTitle title="Reset" className={classes.dialogTitle}>Reset Your Password</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <TextField fullWidth label="Your Email" onChange={handleChangeInviteName} />
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="outlined" onClick={() => history.push('/')}>Cancel</Button>
        <Button color="primary" variant="contained" onClick={handleAskLink}>Ask a link</Button>
      </DialogActions>
    </Dialog>
  )
}