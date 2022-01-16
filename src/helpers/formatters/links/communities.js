export const main = () => {
  return {
    name: 'CommunitiesPage',
    params: {},
    path: 'communities'
  }
}

export const community = ({ communityId }) => {
  return {
    name: 'CommunityPage',
    params: { communityId },
    path: `communities/${communityId}`
  }
}
