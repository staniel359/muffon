import {
  BrowserView
} from 'electron'
import getElectronStoreKey from '../electronStore/getKey.js'
import getActiveId from './getActiveId.js'
import setActive from './setActive.js'
import setBounds from './setBounds.js'
import setScale from './setScale.js'
import {
  baseUrl
} from '../../urls.js'
import {
  isDevelopment
} from '../../utils.js'
import {
  handleNewWindow
} from '../../handlers/app.js'

export default function create (
  data
) {
  const {
    uuid,
    path
  } = data

  const options = {
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  }

  const tab =
    new BrowserView(
      options
    )

  tab.uuid = uuid

  mainWindow.addBrowserView(
    tab
  )

  const isSwitchToNewTab =
    getElectronStoreKey(
      'layout.isSwitchToNewTab'
    )

  if (!isSwitchToNewTab) {
    setActive(
      getActiveId()
    )
  }

  setBounds(
    tab
  )

  const autoResizeOptions = {
    width: true,
    height: true
  }

  tab.setAutoResize(
    autoResizeOptions
  )

  const url = `${baseUrl}#/${path}`

  tab
    .webContents
    .loadURL(
      url
    )

  if (isDevelopment) {
    const devToolsData = {
      mode: 'right'
    }

    tab
      .webContents
      .openDevTools(
        devToolsData
      )
  }

  mainWindow
    .webContents
    .send(
      'add-tab',
      data
    )

  function handleDidStartNavigation () {
    const data = {
      'layout.tabId': uuid
    }

    tab
      .webContents
      .send(
        'update-store',
        data
      )
  }

  function handleDomReady () {
    const scale =
      getElectronStoreKey(
        'layout.scale'
      )

    setScale(
      tab,
      scale
    )
  }

  tab
    .webContents
    .setWindowOpenHandler(
      handleNewWindow
    )

  tab
    .webContents
    .on(
      'did-start-navigation',
      handleDidStartNavigation
    )

  tab
    .webContents
    .on(
      'dom-ready',
      handleDomReady
    )
}
