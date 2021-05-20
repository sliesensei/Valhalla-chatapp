import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, TextField } from "@material-ui/core";
import { sha256 } from "js-sha256";
import server from "../sockets/useServer";
import { useSnackbar } from "notistack";

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

export default function Signup() {
  const { enqueueSnackbar } = useSnackbar()
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const classes = useStyles();
  const [form, setForm] = useState<any>({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    username: undefined,
    password: undefined,
    cpassword: undefined
  })


  const handleSubmit = useCallback(() => {
    const lenght = Object.keys(form).filter((key) => !!form[key]).length;
    if (lenght === 6 && form.password === form.cpassword) {
      const { cpassword, password, ...rest } = form;
      server.signup({ ...rest, password: sha256(password) })
        .then(({ message, variant, ...rest }: any) => {
          console.log(rest)
          enqueueSnackbar(message, { variant })
        })
    }
  }, [enqueueSnackbar, form]);

  const handleChange = useCallback(({ target: { name, value } }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (name) {
      setForm((prevState: any) => ({ ...prevState, [name]: value }))
    }
  }, [])

  useEffect(() => {
    if (!dialogOpen) {
      setForm({
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        username: undefined,
        password: undefined,
        cpassword: undefined
      })
    }
  }, [dialogOpen])

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setDialogOpen(prev => !prev)}>Sign up</Button>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle title="Sign Up" className={classes.title}>Sign Up</DialogTitle>
        <DialogContent className={classes.content}>
          <TextField label="First Name" name="firstName" onChange={handleChange} />
          <TextField label="Last Name" name="lastName" onChange={handleChange} />
          <TextField fullWidth label="Email" name="email" onChange={handleChange} />
          <TextField fullWidth label="Username" name="username" onChange={handleChange} />
          <TextField fullWidth label="Password" type="password" name="password" onChange={handleChange} />
          <TextField fullWidth label="Confirm Password" type="password" name="cpassword" onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button color="default" onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button color="primary" onClick={handleSubmit}>Sign Up</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}