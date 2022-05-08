export function main (
  {
    profileId,
    libraryAlbumId
  }
) {
  return {
    name: 'ProfileLibraryAlbumMainPage',
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
