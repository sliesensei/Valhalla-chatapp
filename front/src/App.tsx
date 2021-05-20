import React, { useContext } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import { ThemeProvider } from '@material-ui/core';
import './App.css';
import home from './pages/home';
import themeLight from './themes/themeLight';
import themeDark from './themes/themeDark';
import { GlobalContext } from './context/Store';
import withContext from './hooks/withContext';
import Confirmation from './pages/confirmation';
import { SnackbarProvider } from 'notistack';
import chats from './pages/chats';

function App() {
  const { currentTheme } = useContext(GlobalContext)
  return (
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider theme={currentTheme === 'light' ? themeLight : themeDark}>
        <BrowserRouter>
          <Switch>
            <Route path='/home' component={home} />
            <Route path="/confirmations/:token" component={Confirmation} />
            <Route path='/login' />
            <Route path='/logout' />
            <Route path='/chats/:id' />
            <Route path='/chats' component={chats} />
            <Redirect to='/home' />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </SnackbarProvider>

  );
}

export default withContext(App);
