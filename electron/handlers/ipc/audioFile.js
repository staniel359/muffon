import readAudioFileMetadata from '#/actions/audioFile/readMetadata'

export function handleReadAudioFileMetadata (
  _,
  {
    filePath
  }
) {
  return readAudioFileMetadata(
    {
      filePath
    }
  )
}
