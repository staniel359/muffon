import {
  album as defaultImage
} from '@/helpers/data/defaultImages'

export const fields = {
  results: 'albums',
  title: 'title',
  description: 'artistName',
  image: 'imageExtrasmall'
}

export function format (
  albumData
) {
  const artistName =
    albumData.artist.name

  const artistNameFormatted =
    `<div class="artist-name">${artistName}</div>`

  const imageExtrasmall = (
    albumData.image?.extrasmall ||
      defaultImage
  )

  return {
    ...albumData,
    artistName: artistNameFormatted,
    imageExtrasmall
  }
}
