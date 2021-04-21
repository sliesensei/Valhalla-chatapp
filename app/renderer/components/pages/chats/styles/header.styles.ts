import { makeStyles } from "@material-ui/core"

export default makeStyles({
  root: {
    height: '50px',
    backgroundColor: '#1d1e1f',
    display: 'flex',
    alignContent: 'flex-start',
    justifyItems: 'center',
    color: '#ffffff',
    width: '100%',
    // position: 'fixed',
    "& h2": {
      marginLeft: '5px'
    }
  },
});
