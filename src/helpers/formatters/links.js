export const artistMain = ({ artistName }) => {
  return {
    name: 'ArtistMainPage',
    params: { artistName },
    path: `artists/${artistName}`
  }
}

export const artistImages = ({ artistName }) => {
  return {
    name: 'ArtistImagesPage',
    params: { artistName },
    path: `artists/${artistName}/images`
  }
}

export const artistTracks = ({ artistName }) => {
  return {
    name: 'ArtistTracksPage',
    params: { artistName },
    path: `artists/${artistName}/tracks`
  }
}

export const artistAlbums = ({ artistName }) => {
  return {
    name: 'ArtistAlbumsPage',
    params: { artistName },
    path: `artists/${artistName}/albums`
  }
}

export const artistSimilar = ({ artistName }) => {
  return {
    name: 'ArtistSimilarPage',
    params: { artistName },
    path: `artists/${artistName}/similar`
  }
}

export const albumMain = ({ artistName, albumTitle }) => {
  return {
    name: 'AlbumMainPage',
    params: { artistName, albumTitle },
    path: `artists/${artistName}/albums/${albumTitle}`
  }
}

export const trackMain = ({ artistName, trackTitle }) => {
  return {
    name: 'TrackMainPage',
    params: { artistName, trackTitle },
    path: `artists/${artistName}/tracks/${trackTitle}`
  }
}

export const trackSimilar = ({ artistName, trackTitle }) => {
  return {
    name: 'TrackSimilarPage',
    params: { artistName, trackTitle },
    path: `artists/${artistName}/tracks/${trackTitle}/similar`
  }
}

export const tagMain = ({ tagName }) => {
  return {
    name: 'TagMainPage',
    params: { tagName },
    path: `tags/${tagName}`
  }
}

export const tagArtists = ({ tagName }) => {
  return {
    name: 'TagArtistsPage',
    params: { tagName },
    path: `tags/${tagName}/artists`
  }
}

export const tagAlbums = ({ tagName }) => {
  return {
    name: 'TagAlbumsPage',
    params: { tagName },
    path: `tags/${tagName}/albums`
  }
}

export const tagTracks = ({ tagName }) => {
  return {
    name: 'TagTracksPage',
    params: { tagName },
    path: `tags/${tagName}/tracks`
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
