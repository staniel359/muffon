export const main = ({ profileId }) => {
  return {
    name: 'ProfileLibraryMainPage',
    params: { profileId },
    path: `profiles/${profileId}/library`
  }
}

export const artists = ({ profileId }) => {
  return {
    name: 'ProfileLibraryArtistsPage',
    params: { profileId },
    path: `profiles/${profileId}/library/artists`
  }
}

export const albums = ({ profileId }) => {
  return {
    name: 'ProfileLibraryAlbumsPage',
    params: { profileId },
    path: `profiles/${profileId}/library/albums`
  }
}

export const tracks = ({ profileId }) => {
  return {
    name: 'ProfileLibraryTracksPage',
    params: { profileId },
    path: `profiles/${profileId}/library/tracks`
  }
}

export const tags = ({ profileId }) => {
  return {
    name: 'ProfileLibraryTagsPage',
    params: { profileId },
    path: `profiles/${profileId}/library/tags`
  }
}
