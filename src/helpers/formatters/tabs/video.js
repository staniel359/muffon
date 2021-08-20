import { main as formatVideoMainLink } from '#/formatters/links/video'
import { localize } from '#/actions/plugins/i18n'

export default function ({ videoTitle, videoId, pageNameKey }) {
  const formatSubpageTitle = () => {
    if (pageNameKey) {
      return localize(
        `layout.navigation.video.${pageNameKey}`
      ).toLowerCase()
    }
  }

  const title = [
    videoTitle,
    formatSubpageTitle()
  ].filter(e => e).join(' ')

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
    title,
    path: formatPath()
  }
}
