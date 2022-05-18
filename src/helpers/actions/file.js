import musicMetadata from 'music-metadata'
import {
  tags as formatFileTags
} from '*/helpers/formatters/file'

export function formatTags (
  file
) {
  const handleSuccess = (
    metadata
  ) => {
    const successTrack =
      formatFileTags(
        {
          file,
          tags: metadata.common
        }
      )

    this.addCollectionItem(
      {
        collection: 'successTracks',
        item: successTrack
      }
    )
  }

  const handleError = () => {
    const errorTrack = {
      text: file.path
    }

    this.addCollectionItem(
      {
        collection: 'errorTracks',
        item: errorTrack
      }
    )
  }

  const handleFinish = () => {
    this.incrementProgress()
  }

  return musicMetadata.parseFile(
    file.path
  ).then(
    handleSuccess
  ).catch(
    handleError
  ).finally(
    handleFinish
  )
}
