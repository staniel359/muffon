const {
  generateKey
} = require(
  '../../../shared/helpers/utils'
)
const {
  audioFolderPath
} = require(
  '../../paths'
)
const findTab = require(
  '../tab/find'
)
const {
  download
} = require(
  'electron-dl'
)
const encrypt = require(
  './encrypt'
)
const getPath = require(
  './getPath'
)
const moment = require(
  'moment-timezone'
)

let trackData

let fileName
let tempFileName

let tab

let key
let iv

function formatTrackData () {
  delete trackData.audio.link

  trackData.uuid = fileName

  trackData.created =
    moment.utc().toDate()

  const filePath =
    getPath(
      fileName
    )

  trackData.audio.local = {
    path: filePath,
    key,
    iv
  }
}

function handleSuccess () {
  const encryptedData =
    encrypt(
      {
        tempFileName,
        fileName
      }
    )

  key = encryptedData.key
  iv = encryptedData.iv

  formatTrackData()

  const data = {
    trackData
  }

  tab
    .webContents
    .send(
      'save-audio-complete',
      data
    )
}

function handleError () {
  tab
    .webContents
    .send(
      'save-audio-error'
    )
}

function save (
  {
    track,
    tabId
  }
) {
  trackData =
    JSON.parse(
      track
    )

  const url = trackData.audio.link

  fileName = generateKey()
  tempFileName = `${fileName}-temp`

  const options = {
    directory: audioFolderPath,
    filename: tempFileName
  }

  tab = findTab(
    tabId
  )

  download(
    mainWindow,
    url,
    options
  ).then(
    handleSuccess
  ).catch(
    handleError
  )
}

module.exports = save
