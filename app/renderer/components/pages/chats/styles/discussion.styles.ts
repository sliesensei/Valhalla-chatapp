import { makeStyles } from "@material-ui/core"
import { CSSProperties } from "@material-ui/styles";

const speachBubble: CSSProperties = {
  padding: '5px 15px 5px 15px',
  marginBottom: '2px',
  maxWidth: '60%',
}

export default makeStyles({
  root: {
    display: 'grid',
    height: '100vh',
    maxHeight: '100vh',
    alignContent: 'space-between',
    minHeight: '100vh',
    gridTemplateColumns: '100%',
    gridTemplateRows: '50px auto auto',
    gridTemplateAreas: `
      "header"
        "main"
        "footer"
    `,
  },
  header: {
    gridArea: 'header',
    // height: '50px'
  },
  main: {
    height: '100%',
    display: 'flex',
    alignContent: 'flex-start',
    overflow: 'scroll',
    gridArea: 'main',
    "&::-webkit-scrollbar": {
      display: 'none'
    },
  },
  footer: {
    gridArea: 'footer',
    alignContent: 'flex-end',
    minHeight: '35px'
    // height: '50px'
  },
  messageList: {
    backgroundColor: '#1d1e1f',
    width: '100%',
    color: '#ffffff',
    // msLineBreak: 'normal',
    marginBottom: 'auto',
    padding: '0 15px 0 15px',
  },
  messageRight: {
    "& div": {
      ...speachBubble,
      float: 'right',
      wordBreak: 'break-all',
      overflow: 'auto',
      wordWrap: 'break-all',
      overflowWrap: 'break-word',
      whiteSpace: 'initial',
      backgroundColor: '#0d76ff',
      textAlign: 'left',
      borderRadius: '20px 5px 5px 20px',
    },
    "&:only-child div": {
      borderRadius: '20px 20px 20px 20px',
    },
    "&:last-child:not(:only-child) div": {
      borderRadius: '20px 5px 20px 20px'
    },
    "&:first-child:not(:only-child) div": {
      borderRadius: '20px 20px 5px 20px'
    }
  },
  messageLeft: {
    "& div": {
      ...speachBubble,
      float: 'left',
      wordWrap: 'break',
      backgroundColor: '#3f4041',
      textAlign: 'left',
      borderRadius: '5px 20px 20px 5px',
    },
    "&:only-child div": {
      borderRadius: '20px 20px 20px 20px',
    },
    "&:last-child:not(:only-child) div": {
      borderRadius: '5px 20px 20px 20px',
    },
    "&:first-child:not(:only-child) div": {
      borderRadius: '20px 20px 20px 5px',
    },
  }
});
