export function main (
  {
    profileId,
    libraryTrackId
  }
) {
  return {
    name: 'ProfileLibraryTrackMainPage',
    params: {
      profileId,
      libraryTrackId
    },
    path: `profiles/${profileId}/library/tracks/${libraryTrackId}`
  }
}

export function albums (
  {
    profileId,
    libraryTrackId
  }
) {
  return {
    name: 'ProfileLibraryTrackAlbumsPage',
    params: {
      profileId,
      libraryTrackId
    },
    path: `profiles/${profileId}/library/tracks/${libraryTrackId}/albums`
  }
}

export function playlists (
  {
    profileId,
    libraryTrackId
  }
) {
  return {
    name: 'ProfileLibraryTrackPlaylistsPage',
    params: {
      profileId,
      libraryTrackId
    },
    path: `profiles/${profileId}/library/tracks/${libraryTrackId}/playlists`
  }
}
