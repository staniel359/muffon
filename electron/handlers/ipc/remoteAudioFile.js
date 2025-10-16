import readRemoteAudioFileMetadata
  from '../../actions/remoteAudioFile/readMetadata.js'

export function handleReadRemoteAudioFileMetadata (
  _,
  {
    fileUrl
  }
) {
  return readRemoteAudioFileMetadata(
    {
      fileUrl
    }
  )
}
