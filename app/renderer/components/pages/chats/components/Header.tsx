import useStyles from '../styles/header.styles';

export default function Header({ name }) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h2>{name}</h2>
    </div>
  )
}