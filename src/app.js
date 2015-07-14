import remote from 'remote'
import React from 'react'
import router from './router'
import injectTapEventPlugin from 'react-tap-event-plugin'

// Constants
const app = remote.require('app')
const Menu = remote.require('menu')
const shell = remote.require('shell')
const BrowserWindow = remote.require('browser-window')
const CMDORCTRL = (process.platform === 'win32') ? 'Ctrl' : 'Command'

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

// Run the router.
router.run((Handler) => {
  React.render(<Handler/>, document.body)
})

// Application Menu
Menu.setApplicationMenu(Menu.buildFromTemplate([
  {
    label: 'RedisExplorer',
    submenu: [
      {
        label: 'About RedisExplorer',
        selector: 'orderFrontStandardAboutPanel:'
      },
      {
        type: 'separator'
      }, {
        label: 'Hide RedisExplorer',
        accelerator: CMDORCTRL + '+H',
        selector: 'hide:'
      },
      {
        label: 'Hide Others',
        accelerator: CMDORCTRL + '+Shift+H',
        selector: 'hideOtherApplications:'
      },
      {
        label: 'Show All',
        selector: 'unhideAllApplications:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: CMDORCTRL + '+Q',
        click: () => app.quit()
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: CMDORCTRL + '+Z',
        selector: 'undo:'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+' + CMDORCTRL + '+Z',
        selector: 'redo:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: CMDORCTRL + '+X',
        selector: 'cut:'
      },
      {
        label: 'Copy',
        accelerator: CMDORCTRL + '+C',
        selector: 'copy:'
      },
      {
        label: 'Paste',
        accelerator: CMDORCTRL + '+V',
        selector: 'paste:'
      },
      {
        label: 'Select All',
        accelerator: CMDORCTRL + '+A',
        selector: 'selectAll:'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: CMDORCTRL + '+R',
        click: () => {
          var focusedWindow = BrowserWindow.getFocusedWindow()
          if (focusedWindow) {
            focusedWindow.reload()
          }
        }
      },
      {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click: () => {
          var focusedWindow = BrowserWindow.getFocusedWindow()
          if (focusedWindow) {
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
          }
        }
      },
      {
        label: 'Toggle DevTools',
        accelerator: 'Alt+' + CMDORCTRL + '+I',
        click: () => remote.getCurrentWindow().toggleDevTools()
      }
    ]
  },
  {
    label: 'Window',
    submenu: [
    {
      label: 'Minimize',
      accelerator: CMDORCTRL + '+M',
      selector: 'performMiniaturize:'
    },
    {
      label: 'Close',
      accelerator: CMDORCTRL + '+W',
      click: () => remote.getCurrentWindow().hide()
    },
    {
      type: 'separator'
    },
    {
      label: 'Bring All to Front',
      selector: 'arrangeInFront:'
    }
    ]
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Report Issue or Suggest Feedback',
        click: () => shell.openExternal('https://github.com/cpsubrian/redis-explorer/issues/new')
      }
    ]
  }
]))
