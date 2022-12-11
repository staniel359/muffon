import {
  artist as defaultImage
} from '@/helpers/data/defaultImages'

export const fields = {
  results: 'artists',
  title: 'name',
  image: 'imageExtrasmall'
}

export function format (
  artistData
) {
  const imageExtrasmall = (
    artistData.image?.extrasmall ||
      defaultImage
  )

  return {
    ...artistData,
    imageExtrasmall
  }
}
