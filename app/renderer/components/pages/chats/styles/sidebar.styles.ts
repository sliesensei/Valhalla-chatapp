import { makeStyles } from "@material-ui/core";
import { CSSProperties } from "@material-ui/styles";

const rowBase: CSSProperties = {
  width: '100%',
  display: 'grid',
  height: '60px',
  alignContent: 'center',
  gridTemplateAreas: `
    "image name"
    "image preview"
  `,
  gridTemplateColumns: "60px auto",
  gridTemplateRows: '50% 50%',
  "&:focus": {
    backgroundColor: '#3b3d3d'
  },
}

export default makeStyles((theme) => ({
  root: {
    // display: 'flex',
    minWidth: '100%'
    // justifyContent: 'center',
  },
  rowSelected: {
    ...rowBase,
    backgroundColor: '#3b3d3d',
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: "100%",
      gridTemplateRows: '100%',
      gridTemplateAreas: `
      "image"
    `,
    },
  },
  row: {
    ...rowBase,
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: "100%",
      gridTemplateRows: '100%',
      gridTemplateAreas: `
      "image"
    `,
    },
  },
  rowName: {
    [theme.breakpoints.down('xs')]: {
      visibility: 'hidden',
    },
    padding: '0px 5px 0px 5px',
    color: '#fff',
    gridArea: 'name',
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    maxHeight: '100%',
  },
  rowImage: {
    height: '100%',
    gridArea: 'image',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  rowPreview: {
    [theme.breakpoints.down('xs')]: {
      visibility: 'none',
    },
    padding: '0px 5px 0px 5px',
    maxHeight: '100%',
    width: '100%',
    display: 'grid',
    gridTemplateAreas: `
    "sender message time"
    `,
    gridTemplateColumns: 'auto auto 20%',
    alignContent: 'center',
    alignItems: 'center',
    color: '#767676',
    gridArea: 'preview'
  },
  rowPreviewSender: {
    gridArea: 'sender'
  },
  rowPreviewMessage: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    gridArea: 'message',
    padding: '0px 2px 0px 2px'
  },
  rowPreviewTime: {
    gridArea: 'time'
  },
  image: {
    height: '75%',
    width: '75%',
    borderRadius: '50%',
  }
}));