import i18n from '&/i18n'
import {
  main as formatVideoMainLink,
  related as formatVideoRelatedLink
} from '#/formatters/links/video'

export default function ({ videoTitle, videoId, pageNameKey }) {
  const formatTitle = () => {
    if (pageNameKey) {
      return i18n.global.t(
        `navigation.model.${pageNameKey}`,
        { modelName: videoTitle }
      )
    } else {
      return videoTitle
    }
  }

  const formatPath = () => {
    switch (pageNameKey) {
      case 'related':
        return formatVideoRelatedLink({
          videoId
        }).path
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
