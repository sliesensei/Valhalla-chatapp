import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import Window from './helpers/handle-window';

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    // frame: false,
    titleBarStyle: 'hidden',
    minWidth: 380,
    minHeight: 400,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
  const handleWindow = new Window(mainWindow);

  ipcMain.on('handle-window', (e, action: 'fullscreen' | 'minimize' | 'close', isFulllscreen?: boolean) => {
    handleWindow[action](isFulllscreen);
  })

})();

app.on('window-all-closed', () => {
  app.quit();
});
