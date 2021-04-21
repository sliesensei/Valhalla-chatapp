import { app, BrowserWindow } from "electron";

export default class Window {
  constructor(private window: BrowserWindow) { }

  fullscreen(isFulllscreen: boolean): void {
    this.window.setFullScreen(isFulllscreen);
    // this.window.show
  }

  minimize() {
    this.window.minimize();
  }

  close() {
    app.quit();
  }
}