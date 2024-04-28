import {
  WebContentsView
} from 'electron'
import getElectronStoreKey from '#/actions/electronStore/getKey'
import getActiveTabId from './getActiveId'
import setActiveTab from './setActive'
import setTabBounds from './setBounds'
import setTabScale from './setScale'
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
    new WebContentsView(
      options
    )

  tab.uuid = uuid
  tab.isTab = true

  changeViewBackgroundColor(
    tab
  )

  mainWindow
    .contentView
    .addChildView(
      tab
    )

  const isSwitchToNewTab =
    getElectronStoreKey(
      'layout.isSwitchToNewTab'
    )

  if (!isSwitchToNewTab) {
    setActiveTab(
      getActiveTabId()
    )
  }

  setTabBounds(
    tab
  )

  const url =
    `${baseUrl}#/${path}`

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

  mainView
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

    setTabScale(
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
