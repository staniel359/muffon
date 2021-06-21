export default function ({ channelTitle, channelId }) {
  const path = [
    'video',
    'channels',
    channelId,
    'videos'
  ].join('/')

  return {
    icon: 'tv',
    title: channelTitle,
    path
  }
}
