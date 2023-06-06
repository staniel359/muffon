import profileStore from '@/stores/profile'

export function main (
  {
    videoId,
    isAutoplay
  }
) {
  const url =
    `https://www.youtube.com/embed/${videoId}`

  const {
    language
  } = profileStore()

  return {
    autoplay: isAutoplay,
    parameters: {
      hl: language
    },
    url
  }
}
