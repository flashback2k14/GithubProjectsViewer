const electron = require("electron");
const { app, dialog, BrowserWindow, Tray, Menu } = electron;
const path = require("path");
const setupSquirrelEvents = require("./events/setupSquirrelEvents");

// init vars
let mainWindow = null;
let willQuit = false;
let tray = null;

// init mainWindow
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 720,
    darkTheme: true,
    icon: path.join(__dirname, "assets/icons/png/128x128.png")
  });
  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);// Emitted when the window is closed.
  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// init tray
const traySetup = () => {
  // init tray
  switch (process.platform) {
    case "darwin":
      tray = new Tray(path.join(__dirname, 'assets/icons/png/16x16.png'));
      break;
    case "win32":
      tray = new Tray(path.join(__dirname, 'assets/icons/png/32x32.png'));
      break;
    default:
      tray = new Tray(path.join(__dirname, 'assets/icons/png/16x16.png'));
  }
  // init context menu
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open',
      click: () => {
        if (mainWindow === null) {
          createWindow();
        } else {
          mainWindow.show();
        }
      }
    }, {
      label: 'Hide',
      click: () => {
        if (mainWindow !== null) {
          mainWindow.hide();
        }
      }
    }, {
      label: 'Quit',
      click: () => {
        app.quit();
      }
    }, {
      type: 'separator'
    }, {
      label: 'About',
      click: () => {
        dialog.showMessageBox(mainWindow,
          {
            type: 'info',
            title: 'About',
            message: 'GithubProjectsViewer is built by flashback2k14',
            detail: 'You can find me on GitHub.',
            icon: path.join(__dirname, 'assets/icons/png/64x64.png')
          }
        );
      }
    }
  ]);
  // set context menu to tray
  tray.setToolTip('GithubProjectsViewer');
  tray.setContextMenu(contextMenu);
  // init click listener
  tray.on('click', () => {
    if (mainWindow === null) {
      createWindow();
    } else {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    }
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  // Squirrel events have to be handled before anything else
  if (setupSquirrelEvents.handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
  }
  createWindow();
  traySetup();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
