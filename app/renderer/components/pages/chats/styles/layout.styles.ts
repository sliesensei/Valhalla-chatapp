import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  sidebar: {
    paddingTop: '15px',
    overflow: 'scroll',
    // height: '100vh',
    width: '310px',
    "&::-webkit-scrollbar": {
      display: 'none'
    },
    [theme.breakpoints.down('xs')]: {
      width: '85px',
    },
    backgroundColor: '#323334',
  },
  main: {
    overflow: 'scroll',
    "&::-webkit-scrollbar": {
      display: 'none'
    },
    height: '100vh',
    width: 'calc(100vw - 310px)',
    [theme.breakpoints.down('xs')]: {
      width: 'calc(100vw - 85px)',
    },
  }
}))