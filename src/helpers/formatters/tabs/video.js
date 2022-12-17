import i18n from '#/plugins/i18n'
import {
  main as formatVideoMainLink,
  related as formatVideoRelatedLink
} from '@/helpers/formatters/links/video'

export default function (
  {
    channelTitle,
    videoTitle,
    videoId,
    scope
  }
) {
  function formatVideoPageTitle () {
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

  const videoChannelPageTitle =
    i18n.global.t(
      'navigation.model.videos',
      {
        modelName: channelTitle
      }
    )

  const title = [
    formatVideoPageTitle(),
    videoChannelPageTitle
  ].join(
    ' | '
  )

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
    icon: 'video',
    title,
    path: formatPath()
  }
}
