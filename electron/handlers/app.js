export function handleAllWindowsClosed (
  event
) {
  event.preventDefault()
}

export function handleNewWindow (
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
