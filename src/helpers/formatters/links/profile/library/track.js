export function main (
  {
    profileId,
    libraryTrackId
  }
) {
  return {
    name: 'ProfileLibraryTrackMainPage',
    params: {
      profileId,
      libraryTrackId
    },
    path: `profiles/${profileId}/library/tracks/${libraryTrackId}`
  }
}
