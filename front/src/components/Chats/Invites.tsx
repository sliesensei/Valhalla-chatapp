import {
  Button,
  Dialog,
  DialogActions,
  DialogContent, DialogTitle, makeStyles, Theme, Typography
} from '@material-ui/core';
import server from '../../sockets/useServer';

interface Props {
  dialogOpen: boolean
  invites: Array<any>
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

export default function Invites({ dialogOpen, onClose, invites }: Props) {
  const classes = useStyles();

  return (
    <Dialog
      fullWidth
      onClose={onClose}
      open={dialogOpen}
      maxWidth="md"
    >
      <DialogTitle title="Invitation" className={classes.dialogTitle}>Chat Settings</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {invites.map((invite) =>
        (<div className={classes.contentSection}>
          <Typography variant="h5">You've  been invited to join {invite.roomName} by {invite.userName}</Typography>
          <Button color="primary" variant="contained" onClick={() => {
            server.invites.accept(invite.token).then(() => {
              window.location.reload()
            })
          }}>Join</Button>
        </div>)
        )}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>Done</Button>
      </DialogActions>
    </Dialog>
  )
}