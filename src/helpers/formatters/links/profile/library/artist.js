export const main = ({ profileId, artistId }) => {
  return {
    name: 'ProfileLibraryArtistMainPage',
    params: { profileId, artistId },
    path: `profiles/${profileId}/library/artists/${artistId}`
  }
}

export const albums = ({ profileId, artistId }) => {
  return {
    name: 'ProfileLibraryArtistAlbumsPage',
    params: { profileId, artistId },
    path: `profiles/${profileId}/library/artists/${artistId}/albums`
  }
}

export const tracks = ({ profileId, artistId }) => {
  return {
    name: 'ProfileLibraryArtistTracksPage',
    params: { profileId, artistId },
    path: `profiles/${profileId}/library/artists/${artistId}/tracks`
  }
}
