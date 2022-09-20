import i18n from '@/plugins/i18n'
import {
  main as formatVideoMainLink,
  related as formatVideoRelatedLink
} from '@/helpers/formatters/links/video'

export default function (
  {
    videoTitle,
    videoId,
    scope
  }
) {
  function formatTitle () {
    if (scope) {
      return i18n.global.t(
        `navigation.model.${scope}`,
        {
          modelName: videoTitle
        }
      )
    } else {
      return videoTitle
    }
  }

  function formatPath () {
    switch (scope) {
      case 'related':
        return formatVideoRelatedLink(
          {
            videoId
          }
        ).path
      default:
        return formatVideoMainLink(
          {
            videoId
          }
        ).path
    }
  }

  return {
    icon: 'film',
    title: formatTitle(),
    path: formatPath()
  }
}
