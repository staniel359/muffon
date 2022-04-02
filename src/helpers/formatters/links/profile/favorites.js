export const main = ({ profileId }) => {
  return {
    name: 'ProfileFavoritesMainPage',
    params: { profileId },
    path: `profiles/${profileId}/favorites`
  }
}

export const artists = ({ profileId }) => {
  return {
    name: 'ProfileFavoritesArtistsPage',
    params: { profileId },
    path: `profiles/${profileId}/favorites/artists`
  }
}

export const albums = ({ profileId }) => {
  return {
    name: 'ProfileFavoritesAlbumsPage',
    params: { profileId },
    path: `profiles/${profileId}/favorites/albums`
  }
}

export const tracks = ({ profileId }) => {
  return {
    name: 'ProfileFavoritesTracksPage',
    params: { profileId },
    path: `profiles/${profileId}/favorites/tracks`
  }
}
