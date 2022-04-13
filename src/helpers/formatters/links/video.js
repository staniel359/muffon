export function main (
  {
    videoId
  }
) {
  return {
    name: 'VideoMainPage',
    params: {
      videoId
    },
    path: `video/videos/${videoId}`
  }
}

export function related (
  {
    videoId
  }
) {
  return {
    name: 'VideoRelatedPage',
    params: {
      videoId
    },
    path: `video/videos/${videoId}/related`
  }
}
