export const main = ({ profileId }) => {
  return {
    name: 'ProfileMainPage',
    params: { profileId },
    path: `profiles/${profileId}`
  }
}

export const favorites = ({ profileId }) => {
  return {
    name: 'ProfileFavoritesPage',
    params: { profileId },
    path: `profiles/${profileId}/favorites`
  }
}
