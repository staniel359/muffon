export function main (
  {
    profileId
  }
) {
  return {
    name: 'ProfileFavoritesMainPage',
    params: {
      profileId
    },
    path: `profiles/${profileId}/favorites`
  }
}

export function artists (
  {
    profileId
  }
) {
  return {
    name: 'ProfileFavoritesArtistsPage',
    params: {
      profileId
    },
    path: `profiles/${profileId}/favorites/artists`
  }
}

export function albums (
  {
    profileId
  }
) {
  return {
    name: 'ProfileFavoritesAlbumsPage',
    params: {
      profileId
    },
    path: `profiles/${profileId}/favorites/albums`
  }
}

export function tracks (
  {
    profileId
  }
) {
  return {
    name: 'ProfileFavoritesTracksPage',
    params: {
      profileId
    },
    path: `profiles/${profileId}/favorites/tracks`
  }
}
