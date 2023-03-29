export function main (
  {
    channelId
  }
) {
  return {
    name: 'VideoChannelPage',
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

export function playlists (
  {
    channelId
  }
) {
  return {
    name: 'VideoChannelPlaylistsPage',
    params: {
      channelId
    },
    path: `video/channels/${channelId}/playlists`
  }
}
