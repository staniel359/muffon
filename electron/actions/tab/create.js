import {
  BrowserView
} from 'electron'
import getElectronStoreKey from '#/actions/electronStore/getKey'
import getActiveId from './getActiveId'
import setActive from './setActive'
import setBounds from './setBounds'
import setScale from './setScale'
import {
  baseUrl
} from '#/helpers/urls'
import {
  isDevelopment
} from '#/helpers/utils'
import {
  handleNewWindow
} from '#/handlers/app'
import changeViewBackgroundColor
  from '#/actions/view/changeBackgroundColor'

export default function (
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

  changeViewBackgroundColor(
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
