export function main (
  {
    profileId,
    libraryTagId
  }
) {
  return {
    name: 'ProfileLibraryTagPage',
    params: {
      profileId,
      libraryTagId
    },
    path: `profiles/${profileId}/library/tags/${libraryTagId}`
  }
}

export function artists (
  {
    profileId,
    libraryTagId
  }
) {
  return {
    name: 'ProfileLibraryTagArtistsPage',
    params: {
      profileId,
      libraryTagId
    },
    path: `profiles/${profileId}/library/tags/${libraryTagId}/artists`
  }
}
