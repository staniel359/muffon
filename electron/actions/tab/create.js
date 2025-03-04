import {
  WebContentsView
} from 'electron'
import getSettingsKey from '../settings/getKey.js'
import getActiveTabId from './getActiveId.js'
import setActiveTab from './setActive.js'
import setTabBounds from './setBounds.js'
import setViewScale from '../view/setScale.js'
import {
  baseUrl
} from '../../helpers/urls.js'
import {
  isDevelopment
} from '../../helpers/utils.js'
import {
  handleNewWindow
} from '../../handlers/app.js'
import changeViewBackgroundColor
  from '../view/changeBackgroundColor.js'
import {
  preloadScriptFilePath
} from '../../helpers/paths.js'

export default function (
  data
) {
  const {
    uuid,
    path
  } = data

  const options = {
    webPreferences: {
      devTools: isDevelopment,
      preload: preloadScriptFilePath,
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
    getSettingsKey(
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
    tab
      .webContents
      .send(
        'update-store',
        {
          'layout.tabId': uuid
        }
      )
  }

  function handleDomReady () {
    setViewScale(
      tab
    )
  }

  function addNewWindowHandler (
    details
  ) {
    return handleNewWindow(
      {
        url: details.url,
        tabId: tab.uuid
      }
    )
  }

  tab
    .webContents
    .setWindowOpenHandler(
      addNewWindowHandler
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
