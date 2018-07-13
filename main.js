const {app, BrowserWindow, Menu} = require('electron')
var shell = require('shelljs');
shell.config.execPath = process.execPath;
console.log(process.execPath);
console.log(shell.config.execPath);
shell.exec('echo hello',{async:true}).stdout;
shell.exec('echo done',{async:true}).stdout;
  
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let win
  
  function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({width: 800, height: 600})
  
    // and load the index.html of the app.
    win.loadFile('index.html')
  

  
    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
    })
    //Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Insert menu
    Menu.setApplicationMenu(mainMenu);
  }

  //Create menu template
  const mainMenuTemplate = [
    {
      label:'File',
      submenu:[
        {
          label: 'Add Item'
        },
        {
          label: 'Clear Item'
        },
        {
          label: 'Quit',
          accelerator: process.platform == 'darwin' ? 'Command+Q' : 'ctrl+Q',
          click(){
            app.quit();
          }
        }
      ]
    }
  ];
  //add empty object in mac platform
  if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
  }
  //if in develpmen mode
  if(process.env.NODE_ENV !== 'production')
  {
    mainMenuTemplate.push({
      label:'Developer Tool',
      submenu:[
        {
          label: 'Toggle DevTools',
          click(item, focusedWindow){
            focusedWindow.toggleDevTools();
          }
        }
      ]
    })
  }
  
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow)
  
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
  })
  
  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.