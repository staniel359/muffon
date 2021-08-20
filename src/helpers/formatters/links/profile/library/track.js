export const main = ({ profileId, trackId }) => {
  return {
    name: 'ProfileLibraryTrackMainPage',
    params: { profileId, trackId },
    path: `profiles/${profileId}/library/tracks/${trackId}`
  }
}
