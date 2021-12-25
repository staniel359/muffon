export const main = ({ videoId }) => {
  return {
    name: 'VideoMainPage',
    params: { videoId },
    path: `video/videos/${videoId}`
  }
}

export const related = ({ videoId }) => {
  return {
    name: 'VideoRelatedPage',
    params: { videoId },
    path: `video/videos/${videoId}/related`
  }
}
