function clearCache () {
  return mainWindow
    .webContents
    .session
    .clearCache()
}

module.exports = clearCache
