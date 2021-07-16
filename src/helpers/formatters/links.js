export const artistMain = ({ artistName }) => {
  return {
    name: 'ArtistMainPage',
    params: { artistName },
    path: [
      'artists',
      encodeURIComponent(artistName)
    ].join('/')
  }
}

export const artistImages = ({ artistName }) => {
  return {
    name: 'ArtistImagesPage',
    params: { artistName },
    path: [
      'artists',
      encodeURIComponent(artistName),
      'images'
    ].join('/')
  }
}

export const artistTracks = ({ artistName }) => {
  return {
    name: 'ArtistTracksPage',
    params: { artistName },
    path: [
      'artists',
      encodeURIComponent(artistName),
      'tracks'
    ].join('/')
  }
}

export const artistAlbums = ({ artistName }) => {
  return {
    name: 'ArtistAlbumsPage',
    params: { artistName },
    path: [
      'artists',
      encodeURIComponent(artistName),
      'albums'
    ].join('/')
  }
}

export const artistSimilar = ({ artistName }) => {
  return {
    name: 'ArtistSimilarPage',
    params: { artistName },
    path: [
      'artists',
      encodeURIComponent(artistName),
      'similar'
    ].join('/')
  }
}

export const albumMain = ({ artistName, albumTitle }) => {
  return {
    name: 'AlbumMainPage',
    params: { artistName, albumTitle },
    path: [
      'artists',
      encodeURIComponent(artistName),
      'albums',
      encodeURIComponent(albumTitle)
    ].join('/')
  }
}

export const trackMain = ({ artistName, trackTitle }) => {
  return {
    name: 'TrackMainPage',
    params: { artistName, trackTitle },
    path: [
      'artists',
      encodeURIComponent(artistName),
      'tracks',
      encodeURIComponent(trackTitle)
    ].join('/')
  }
}

export const trackSimilar = ({ artistName, trackTitle }) => {
  return {
    name: 'TrackSimilarPage',
    params: { artistName, trackTitle },
    path: [
      'artists',
      encodeURIComponent(artistName),
      'tracks',
      encodeURIComponent(trackTitle),
      'similar'
    ].join('/')
  }
}

export const tagMain = ({ tagName }) => {
  return {
    name: 'TagMainPage',
    params: { tagName },
    path: [
      'tags',
      encodeURIComponent(tagName)
    ].join('/')
  }
}

export const tagArtists = ({ tagName }) => {
  return {
    name: 'TagArtistsPage',
    params: { tagName },
    path: [
      'tags',
      encodeURIComponent(tagName),
      'artists'
    ].join('/')
  }
}

export const tagAlbums = ({ tagName }) => {
  return {
    name: 'TagAlbumsPage',
    params: { tagName },
    path: [
      'tags',
      encodeURIComponent(tagName),
      'albums'
    ].join('/')
  }
}

export const tagTracks = ({ tagName }) => {
  return {
    name: 'TagTracksPage',
    params: { tagName },
    path: [
      'tags',
      encodeURIComponent(tagName),
      'tracks'
    ].join('/')
  }
}

export const videoChannelVideos = ({ channelId }) => {
  return {
    name: 'VideoChannelVideosPage',
    params: { channelId },
    path: `video/channels/${channelId}/videos`
  }
}

export const videoMain = ({ videoId }) => {
  return {
    name: 'VideoMainPage',
    params: { videoId },
    path: `video/videos/${videoId}`
  }
}
