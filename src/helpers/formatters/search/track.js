import {
  track as defaultImage
} from '@/helpers/data/defaultImages'

export const fields = {
  results: 'tracks',
  title: 'title',
  description:
    'artistNameWithAlbumTitle',
  image: 'imageExtrasmall'
}

export function format (
  trackData
) {
  const artistName =
    trackData.artist.name

  const artistNameFormatted = (
    `<div class="artist-name">
      ${artistName}
    </div>`
  )

  const albumTitle =
    trackData.album?.title

  const albumTitleFormatted = (
    albumTitle &&
      `<div class="album-title">
        <small>
          ${albumTitle}
        </small>
      </div>`
  )

  const artistNameWithAlbumTitle = [
    artistNameFormatted,
    albumTitleFormatted
  ].filter(
    e => e
  ).join(
    ''
  )

  const imageExtrasmall = (
    trackData.image?.extrasmall ||
      defaultImage
  )

  return {
    ...trackData,
    artistNameWithAlbumTitle,
    imageExtrasmall
  }
}
