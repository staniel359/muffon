export function main (
  {
    communityId
  }
) {
  return {
    name: 'CommunityMainPage',
    params: {
      communityId
    },
    path: `communities/${communityId}`
  }
}

export function posts (
  {
    communityId
  }
) {
  return {
    name: 'CommunityPostsPage',
    params: {
      communityId
    },
    path: `communities/${communityId}/posts`
  }
}
