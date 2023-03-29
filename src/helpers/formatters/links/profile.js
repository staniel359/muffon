export function main (
  {
    profileId
  }
) {
  return {
    name: 'ProfilePage',
    params: {
      profileId
    },
    path: `profiles/${profileId}`
  }
}

export function playlists (
  {
    profileId
  }
) {
  return {
    name: 'ProfilePlaylistsPage',
    params: {
      profileId
    },
    path: `profiles/${profileId}/playlists`
  }
}

export function playlist (
  {
    profileId,
    playlistId
  }
) {
  return {
    name: 'ProfilePlaylistPage',
    params: {
      profileId,
      playlistId
    },
    path: `profiles/${profileId}/playlists/${playlistId}`
  }
}

export function posts (
  {
    profileId
  }
) {
  return {
    name: 'ProfilePostsPage',
    params: {
      profileId
    },
    path: `profiles/${profileId}/posts`
  }
}

export function communities (
  {
    profileId
  }
) {
  return {
    name: 'ProfileCommunitiesPage',
    params: {
      profileId
    },
    path: `profiles/${profileId}/communities`
  }
}
