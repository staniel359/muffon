import i18n from '*/plugins/i18n'
import {
  videos as formatVideoChannelVideosLink
} from '*/helpers/formatters/links/videoChannel'

export default function ({ channelTitle, channelId }) {
  const title = i18n.global.t(
    'navigation.model.videos',
    { modelName: channelTitle }
  )

  const formatPath = () => {
    return formatVideoChannelVideosLink({
      channelId
    }).path
  }

  return {
    icon: 'tv',
    title,
    path: formatPath()
  }
}
