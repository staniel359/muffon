const {
  contextBridge,
  webUtils,
  shell,
  ipcRenderer
} = require(
  'electron'
)
const sanitizeHTML = require(
  'sanitize-html'
)

contextBridge.exposeInMainWorld(
  'mainProcess',
  {
    getFilePath: function (
      file
    ) {
      return webUtils.getPathForFile(
        file
      )
    },
    openExternalLink: function (
      url
    ) {
      shell.openExternal(
        url
      )
    },
    sendCommand: function (
      command,
      value
    ) {
      ipcRenderer.send(
        command,
        value
      )
    },
    sendAsyncCommand: function (
      command,
      value,
      anotherValue
    ) {
      return ipcRenderer.invoke(
        command,
        value,
        anotherValue
      )
    },
    addCommandHandler: function (
      command,
      callback
    ) {
      ipcRenderer.on(
        command,
        callback
      )
    },
    sanitizeString: function (
      string
    ) {
      return sanitizeHTML(
        string,
        {
          disallowedTagsMode: 'recursiveEscape'
        }
      )
    }
  }
)
