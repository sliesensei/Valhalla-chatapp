import { AppBar, Badge, Box, IconButton, makeStyles, Theme, Toolbar, Tooltip } from "@material-ui/core"
import { ExitToApp, Notifications } from "@material-ui/icons"
import { FunctionComponent, useCallback, useEffect, useState } from "react"
import { useHistory } from "react-router"
import Invites from "../components/Chats/Invites"
import server from "../sockets/useServer"

const useStyles = makeStyles((theme: Theme) => {
  console.log(theme)
  return {
    container: {
      backgroundColor: theme.palette.background.default
    },
    toolbar: {
      ...theme.mixins.toolbar,
      display: 'flex',
      justifyContent: 'space-between',
    },
    toggle: {
      color: theme.palette.primary.contrastText,
    },
    signout: {
      color: theme.palette.primary.contrastText,
    },
    main: {
      display: 'grid',
      gridTemplateRows: `${theme.mixins.toolbar.height}px calc(100vh - ${theme.mixins.toolbar.height}px)`,
    }
  }
})

export default function withContainer<T>(Component: FunctionComponent<T>) {
  return (props: T) => {
    const classes = useStyles();
    const history = useHistory();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [notifications, setNotification] = useState([]);

    useEffect(() => {
      server.invites.list?.then(({ data }) => {
        setNotification(data?.invites ?? []);
      })
    }, [])

    const handleChangeDialogOpen = useCallback(() => {
      setDialogOpen(prev => !prev);
    }, [])

    const handleSignOut = useCallback(() => {
      localStorage.clear();
      history.push('/');
    }, [history])

    return (
      <div className={classes.container}>
        <AppBar>
          <Toolbar className={classes.toolbar}>
            Valhalla Chat App
            <div>
              <IconButton color="primary" onClick={handleChangeDialogOpen}>
                <Tooltip title="Invites">
                  <Badge badgeContent={notifications.length} color="error">
                    <Notifications className={classes.signout}>
                    </Notifications>
                    <Invites dialogOpen={dialogOpen} onClose={handleChangeDialogOpen} invites={notifications} />
                  </Badge>
                </Tooltip>
              </IconButton>
              <IconButton color="primary" onClick={handleSignOut}>
                <Tooltip title="Sign out">
                  <ExitToApp className={classes.signout} />
                </Tooltip>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.main}>
          <div className={classes.toolbar} />

          <Box overflow="hidden" >
            <Component  {...props} />
          </Box>
        </div>
      </div>
    )
  }
}