export const videos = ({ channelId }) => {
  return {
    name: 'VideoChannelVideosPage',
    params: { channelId },
    path: `video/channels/${channelId}/videos`
  }
}
