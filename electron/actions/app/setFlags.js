const {
  app
} = require(
  'electron'
)

function setFlags () {
  app
    .commandLine
    .appendSwitch(
      'try-supported-channel-layouts'
    )
}

module.exports = setFlags
