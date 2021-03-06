import { createMuiTheme } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'

export default createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      // main: '#556cd6', // Blue
      main: '#00c687', // Green
      contrastText: 'white',
    },
    secondary: {
      main: '#19857b',
      contrastText: 'white',
    },
    error: {
      main: red.A400,
    },
    success: {
      main: '#00945a',
    },
  },
  mixins: {
    toolbar: {
      height: 64,
    }
  }
})
