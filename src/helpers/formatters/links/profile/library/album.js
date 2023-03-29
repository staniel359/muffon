export function main (
  {
    profileId,
    libraryAlbumId
  }
) {
  return {
    name: 'ProfileLibraryAlbumPage',
    params: {
      profileId,
      libraryAlbumId
    },
    path: `profiles/${profileId}/library/albums/${libraryAlbumId}`
  }
}

export function tracks (
  {
    profileId,
    libraryAlbumId
  }
) {
  return {
    name: 'ProfileLibraryAlbumTracksPage',
    params: {
      profileId,
      libraryAlbumId
    },
    path: `profiles/${profileId}/library/albums/${libraryAlbumId}/tracks`
  }
}

export function playlists (
  {
    profileId,
    libraryAlbumId
  }
) {
  return {
    name: 'ProfileLibraryAlbumPlaylistsPage',
    params: {
      profileId,
      libraryAlbumId
    },
    path: `profiles/${profileId}/library/albums/${libraryAlbumId}/playlists`
  }
}
