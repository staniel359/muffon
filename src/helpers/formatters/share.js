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
    source,
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
    source,
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
    source,
    title,
    artist,
    artists,
    album,
    image,
    audio
  } = trackData

  const imageData = image && {
    extrasmall: image.extrasmall
  }

  return {
    model: 'track',
    source,
    player_id:
      trackData.player_id,
    title,
    artist,
    artists,
    album,
    image: imageData,
    audio
  }
}

export function playlist (
  playlistData
) {
  return {
    model: 'playlist',
    id: playlistData.id
  }
}

export function community (
  communityData
) {
  return {
    model: 'community',
    id: communityData.id
  }
}
