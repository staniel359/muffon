export function main (
  {
    profileId,
    artistId
  }
) {
  return {
    name: 'ProfileLibraryArtistMainPage',
    params: {
      profileId,
      artistId
    },
    path: `profiles/${profileId}/library/artists/${artistId}`
  }
}

export function albums (
  {
    profileId,
    artistId
  }
) {
  return {
    name: 'ProfileLibraryArtistAlbumsPage',
    params: {
      profileId,
      artistId
    },
    path: `profiles/${profileId}/library/artists/${artistId}/albums`
  }
}

export function tracks (
  {
    profileId,
    artistId
  }
) {
  return {
    name: 'ProfileLibraryArtistTracksPage',
    params: {
      profileId,
      artistId
    },
    path: `profiles/${profileId}/library/artists/${artistId}/tracks`
  }
}
