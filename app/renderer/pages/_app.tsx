import React from 'react';
import Head from 'next/head';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import type { AppProps } from 'next/app';
import { TitleBar } from 'react-desktop/macOs';
import { ipcRenderer } from 'electron';
import { theme } from '../lib/theme';
import Show from '../components/Show';

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  titleBar: {
    position: 'fixed',
    zIndex: 20000,
    height: '10px',
    width: '100vw',
  }
}));

export default function (props: AppProps) {
  const { Component, pageProps } = props;
  const classes = useStyles();

  const [fullscreen, setFullscreen] = React.useState(false);

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const toggleAction = React.useCallback((action: string) => () => {
    console.log('fullscreen')
    ipcRenderer.send('handle-window', action, !fullscreen);
    if (action === 'fullscreen')
      setFullscreen(!fullscreen);
  }, [fullscreen]);

  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <title>with-typescript-material-ui</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SafeHydrate>
          <div className={classes.titleBar}>
            <TitleBar transparent />
          </div>
        </SafeHydrate>
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}
