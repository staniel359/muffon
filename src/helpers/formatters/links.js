export function artistMain ({ artistName }) {
  return {
    name: 'ArtistMainPage',
    params: { artistName }
  }
}

export function artistImages ({ artistName }) {
  return {
    name: 'ArtistImagesPage',
    params: { artistName }
  }
}

export function artistTracks ({ artistName }) {
  return {
    name: 'ArtistTracksPage',
    params: { artistName }
  }
}

export function artistAlbums ({ artistName }) {
  return {
    name: 'ArtistAlbumsPage',
    params: { artistName }
  }
}

export function artistSimilar ({ artistName }) {
  return {
    name: 'ArtistSimilarPage',
    params: { artistName }
  }
}

export function albumMain ({ artistName, albumTitle }) {
  return {
    name: 'AlbumMainPage',
    params: { artistName, albumTitle }
  }
}

export function trackMain ({ artistName, trackTitle }) {
  return {
    name: 'TrackMainPage',
    params: { artistName, trackTitle }
  }
}

export function trackSimilar ({ artistName, trackTitle }) {
  return {
    name: 'TrackSimilarPage',
    params: { artistName, trackTitle }
  }
}

export function tagMain ({ tagName }) {
  return {
    name: 'TagMainPage',
    params: { tagName }
  }
}

export function tagArtists ({ tagName }) {
  return {
    name: 'TagArtistsPage',
    params: { tagName }
  }
}

export function tagAlbums ({ tagName }) {
  return {
    name: 'TagAlbumsPage',
    params: { tagName }
  }
}

export function tagTracks ({ tagName }) {
  return {
    name: 'TagTracksPage',
    params: { tagName }
  }
}
