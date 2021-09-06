import i18n from '*/i18n'
import { main as formatVideoMainLink } from '#/formatters/links/video'

export default function ({ videoTitle, videoId, pageNameKey }) {
  const formatTitle = () => {
    if (pageNameKey) {
      return i18n.global.t(
        `layout.navigation.video.${pageNameKey}`,
        { videoTitle }
      )
    } else {
      return videoTitle
    }
  }

  const formatPath = () => {
    switch (pageNameKey) {
      default:
        return formatVideoMainLink({
          videoId
        }).path
    }
  }

  return {
    icon: 'film',
    title: formatTitle(),
    path: formatPath()
  }
}
