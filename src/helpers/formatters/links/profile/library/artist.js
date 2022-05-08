export function main (
  {
    profileId,
    libraryArtistId
  }
) {
  return {
    name: 'ProfileLibraryArtistMainPage',
    params: {
      profileId,
      libraryArtistId
    },
    path: `profiles/${profileId}/library/artists/${libraryArtistId}`
  }
}

export function albums (
  {
    profileId,
    libraryArtistId
  }
) {
  return {
    name: 'ProfileLibraryArtistAlbumsPage',
    params: {
      profileId,
      libraryArtistId
    },
    path: `profiles/${profileId}/library/artists/${libraryArtistId}/albums`
  }
}

export function tracks (
  {
    profileId,
    libraryArtistId
  }
) {
  return {
    name: 'ProfileLibraryArtistTracksPage',
    params: {
      profileId,
      libraryArtistId
    },
    path: `profiles/${profileId}/library/artists/${libraryArtistId}/tracks`
  }
}
