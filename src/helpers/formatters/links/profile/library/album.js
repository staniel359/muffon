export const main = ({ profileId, albumId }) => {
  return {
    name: 'ProfileLibraryAlbumMainPage',
    params: { profileId, albumId },
    path: `profiles/${profileId}/library/albums/${albumId}`
  }
}

export const tracks = ({ profileId, albumId }) => {
  return {
    name: 'ProfileLibraryAlbumTracksPage',
    params: { profileId, albumId },
    path: `profiles/${profileId}/library/albums/${albumId}/tracks`
  }
}
