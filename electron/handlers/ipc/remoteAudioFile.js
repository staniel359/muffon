import readRemoteAudioFileMetadata
  from '../../actions/remoteAudioFile/readMetadata.js'

export function handleReadRemoteAudioFileMetadata (
  _,
  {
    fileUrl,
    options = {}
  }
) {
  return readRemoteAudioFileMetadata(
    {
      fileUrl,
      options
    }
  )
}
