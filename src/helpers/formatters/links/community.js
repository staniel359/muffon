export const main = ({ communityId }) => {
  return {
    name: 'CommunityMainPage',
    params: { communityId },
    path: `communities/${communityId}`
  }
}

export const posts = ({ communityId }) => {
  return {
    name: 'CommunityPostsPage',
    params: { communityId },
    path: `communities/${communityId}/posts`
  }
}
