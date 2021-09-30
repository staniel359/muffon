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

export const playlists = ({ profileId }) => {
  return {
    name: 'ProfilePlaylistsPage',
    params: { profileId },
    path: `profiles/${profileId}/playlists`
  }
}

export const playlist = ({ profileId, playlistId }) => {
  return {
    name: 'ProfilePlaylistPage',
    params: { profileId, playlistId },
    path: `profiles/${profileId}/playlists/${playlistId}`
  }
}
