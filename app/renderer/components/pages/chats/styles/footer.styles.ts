import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    padding: '8px 10px 8px 10px',
    bottom: 0,
    backgroundColor: '#1d1e1f',
    minHeight: '35px',
    display: 'grid',
    gridTemplateAreas: `
      "left center right"
    `,
    gridTemplateColumns: "32px auto 32px",
    alignItems: 'flex-end',
    color: '#ffffff',
    width: 'calc(100vw - 310px)',
    [theme.breakpoints.down('xs')]: {
      width: 'calc(100vw - 85px)',
    },
    // position: 'fixed',
  },
  emojiPicker: {
    position: 'absolute',
    bottom: '50px',
    right: '7%'
    // backgroundColor: 'red'
  },
  start: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    gridArea: 'left'
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    gridArea: 'center'
  },
  end: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    gridArea: 'right'
  },
  emojiPickerToggleButton: {
    alignContent: 'flex-end',
    display: 'flex',
    justifyContent: 'center',
  },
  textFieldContainer: {
    width: '100%',
    display: 'flex',
    alignContent: 'flex-end',
    borderRadius: '20px',
    backgroundColor: '#3f4041',
    minHeight: '35px',
    scrollbarColor: '#ffffff',
  },
  textField: {
    width: '100%',
    margin: '0 10px 0 10px',
    caretColor: '#0d76ff',
    color: '#ffffff',
  },
  textFieldInput: {
    "&::-webkit-scrollbar": {
      background: '#3f4041',
      width: '5px'
    },
    "&::-webkit-scrollbar-thumb": {
      background: '#909090'
    },
  }
}));