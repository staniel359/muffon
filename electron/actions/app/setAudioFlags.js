const {
  app
} = require(
  'electron'
)

function setAudioFlags () {
  const flags = [
    'AudioServiceOutOfProcess',
    'AudioProcessSandbox',
    'AudioServiceSandbox'
  ]

  const flagsString =
    flags.join(
      ','
    )

  app
    .commandLine
    .appendSwitch(
      'disable-features',
      flagsString
    )
}

module.exports = setAudioFlags
