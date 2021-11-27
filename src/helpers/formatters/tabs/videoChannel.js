import i18n from '&/i18n'
import {
  videos as formatVideoChannelVideosLink
} from '#/formatters/links/videoChannel'

export default function ({ channelTitle, channelId }) {
  const title = i18n.global.t(
    'layout.navigation.model.videos',
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
