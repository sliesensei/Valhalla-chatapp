import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, TextField } from "@material-ui/core";
import { sha256 } from "js-sha256";
import { useSnackbar } from "notistack";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import server from "../sockets/useServer";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  content: {
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  }
}));

class Form {
  username?: string
  password?: string
}

export default function Signin() {
  const history = useHistory();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const classes = useStyles();
  const [form, setForm] = useState(new Form())
  const { enqueueSnackbar } = useSnackbar()

  const handleChange = useCallback(({ target: { name, value } }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (name) {
      setForm((prevState) => ({ ...prevState, [name]: value }))
    }
  }, [])
  console.log(form)

  useEffect(() => {
    if (!dialogOpen) {
      setForm(new Form())
    }
  }, [dialogOpen])

  const handleSubmit = useCallback(() => {
    const { password, username } = form;
    if (username && password) {
      server.signin({ username, password: sha256(password) })
        .then(({ data, variant, ...rest }: any) => {
          console.log(data, rest)
          enqueueSnackbar(data?.message, { variant });
          if (variant === 'success') {
            history.push('/chats')
          }
        })
    }
  }, [enqueueSnackbar, form, history]);

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setDialogOpen(prev => !prev)}>Sign in</Button>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle title="Sign In" className={classes.title}>Sign In</DialogTitle>
        <DialogContent className={classes.content}>
          <TextField fullWidth label="Username or email" name="username" onChange={handleChange} />
          <TextField fullWidth label="Password" type="password" name="password" onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button color="default" onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button color="primary" onClick={handleSubmit}>Sign In</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}