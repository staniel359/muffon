function handleAllWindowsClosed (
  event
) {
  event.preventDefault()
}

function handleNewWindow (
  {
    url
  }
) {
  const data = {
    url
  }

  mainWindow
    .webContents
    .send(
      'open-external-url',
      data
    )

  return {
    action: 'deny'
  }
}

module.exports = {
  handleAllWindowsClosed,
  handleNewWindow
}
