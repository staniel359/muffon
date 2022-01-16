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

export const posts = ({ profileId }) => {
  return {
    name: 'ProfilePostsPage',
    params: { profileId },
    path: `profiles/${profileId}/posts`
  }
}

export const followers = ({ profileId }) => {
  return {
    name: 'ProfileFollowersPage',
    params: { profileId },
    path: `profiles/${profileId}/followers`
  }
}

export const following = ({ profileId }) => {
  return {
    name: 'ProfileFollowingPage',
    params: { profileId },
    path: `profiles/${profileId}/following`
  }
}

export const communities = ({ profileId }) => {
  return {
    name: 'ProfileCommunitiesPage',
    params: { profileId },
    path: `profiles/${profileId}/communities`
  }
}
