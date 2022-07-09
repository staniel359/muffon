export function main (
  {
    channelId
  }
) {
  return {
    name: 'VideoChannelMainPage',
    params: {
      channelId
    },
    path: `video/channels/${channelId}`
  }
}

export function videos (
  {
    channelId
  }
) {
  return {
    name: 'VideoChannelVideosPage',
    params: {
      channelId
    },
    path: `video/channels/${channelId}/videos`
  }
}
