export const main = ({ profileId }) => {
  return {
    name: 'ProfileMainPage',
    params: { profileId },
    path: `profiles/${profileId}`
  }
}
