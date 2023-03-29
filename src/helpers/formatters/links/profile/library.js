export function main (
  {
    profileId
  }
) {
  return {
    name: 'ProfileLibraryPage',
    params: {
      profileId
    },
    path: `profiles/${profileId}/library`
  }
}

export function artists (
  {
    profileId
  }
) {
  return {
    name: 'ProfileLibraryArtistsPage',
    params: {
      profileId
    },
    path: `profiles/${profileId}/library/artists`
  }
}

export function albums (
  {
    profileId
  }
) {
  return {
    name: 'ProfileLibraryAlbumsPage',
    params: {
      profileId
    },
    path: `profiles/${profileId}/library/albums`
  }
}

export function tracks (
  {
    profileId
  }
) {
  return {
    name: 'ProfileLibraryTracksPage',
    params: {
      profileId
    },
    path: `profiles/${profileId}/library/tracks`
  }
}

export function tags (
  {
    profileId
  }
) {
  return {
    name: 'ProfileLibraryTagsPage',
    params: {
      profileId
    },
    path: `profiles/${profileId}/library/tags`
  }
}
