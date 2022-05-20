module.exports = {
  show: 'Show',
  hide: 'Hide',
  exit: 'Exit',
  update: {
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
