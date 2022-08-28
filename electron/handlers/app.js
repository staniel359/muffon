function handleAllWindowsClosed (
  event
) {
  event.preventDefault()
}

function handleNewWindow () {
  return {
    action: 'deny'
  }
}

module.exports = {
  handleAllWindowsClosed,
  handleNewWindow
}
