export const main = ({ videoId }) => {
  return {
    name: 'VideoMainPage',
    params: { videoId },
    path: `video/videos/${videoId}`
  }
}
