import {
  generateKey
} from '../../utils.js'
import {
  audioFolderPath
} from '../../paths.js'
import findTab from '../tab/find.js'
import {
  download
} from 'electron-dl'
import encrypt from './encrypt.js'
import getPath from './getPath.js'
import moment from 'moment-timezone'

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

export default function save (
  {
    track,
    tabId
  }
) {
  trackData = track

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
