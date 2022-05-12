module.exports = {
  show: 'Show',
  hide: 'Hide',
  exit: 'Exit',
  update: {
    title: 'New version',
    message (
      version
    ) {
      return `Version ${version} is available!`
    },
    buttons: {
      download: 'Download',
      close: 'Close'
    }
  }
}
