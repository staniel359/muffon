export function artist (
  artistData
) {
  const {
    name
  } = artistData

  return {
    model: 'artist',
    name
  }
}

export function album (
  albumData
) {
  const {
    title,
    artist,
    artists,
    image
  } = albumData

  const imageData = image && {
    extrasmall: image.extrasmall
  }

  return {
    model: 'album',
    title,
    artist,
    artists,
    image: imageData
  }
}

export function track (
  trackData
) {
  const {
    title,
    artist,
    artists,
    album,
    image
  } = trackData

  const imageData = image && {
    extrasmall: image.extrasmall
  }

  return {
    model: 'track',
    player_id:
      trackData.player_id,
    title,
    artist,
    artists,
    album,
    image: imageData
  }
}
