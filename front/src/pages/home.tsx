import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import withContainer from "../hooks/withContainer"

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
    color: theme.palette.text.primary,
    height: "80%",
  },
  buttonArea: {
    display: "flex",
    gap: theme.spacing(3),
  }
}))

function Home() {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.container}
      alignContent="center"
      spacing={3}
      justify="center"
    >
      <Grid item xs={12}>
        <Typography variant="h1" className="title">Welcome to Valhalla Chat</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2" >Please Sign in or Sign up</Typography>
      </Grid>
      <Grid item className={classes.buttonArea}>
        <Signin />
        <Signup />
      </Grid>
    </Grid>
  )
}

export default withContainer(Home);
