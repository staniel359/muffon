import {
  selectCover
} from 'music-metadata'

export default function (
  {
    imageData
  }
) {
  return selectCover(
    imageData
  )
}
