export function main (
  {
    videoId
  }
) {
  return {
    name: 'VideoPage',
    params: {
      videoId
    },
    path: `video/videos/${videoId}`
  }
}

export function similar (
  {
    videoId
  }
) {
  return {
    name: 'VideoSimilarPage',
    params: {
      videoId
    },
    path: `video/videos/${videoId}/similar`
  }
}
