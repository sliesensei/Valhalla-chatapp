import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, TextField, Link } from "@material-ui/core";
import { sha256 } from "js-sha256";
import { useSnackbar } from "notistack";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router";
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
  },
  reset: {
    '& > a': {
      colot: theme.palette.primary.main,
    }
  }
}));

class Form {
  password?: string
  cpassword?: string
}

export default function ResetPassword() {
  const history = useHistory();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const classes = useStyles();
  const { token } = useParams<{ token: string }>();
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
    const { password, cpassword } = form;
    if (cpassword && password && password.length && cpassword === password) {
      server.resetPassword(token, sha256(password))
        .then(({ data, variant, ...rest }: any) => {
          console.log(data, rest)
          enqueueSnackbar(data?.message, { variant });
          if (variant === 'success') {
            history.push('/')
          }
        })
    }
  }, [enqueueSnackbar, form, history, token]);

  return (
    <Dialog open maxWidth="xs" fullWidth>
      <DialogTitle title="Sign In" className={classes.title}>Password reset</DialogTitle>
      <DialogContent className={classes.content}>
        <TextField fullWidth label="Password" type="password" name="cpassword" onChange={handleChange} />
        <TextField fullWidth label="ConfirmPassword" type="password" name="password" onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button color="default" onClick={() => history.push('/')}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit}>Sign In</Button>
      </DialogActions>
    </Dialog>
  )
}