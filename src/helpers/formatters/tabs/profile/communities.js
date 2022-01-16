import i18n from '&/i18n'
import {
  communities as formatProfileCommunitiesLink
} from '#/formatters/links/profile'

export default function ({ profileId, profileNickname }) {
  const formatTitle = () => {
    return i18n.global.t(
      'navigation.model.communities',
      { modelName: profileNickname }
    )
  }

  const formatPath = () => {
    return formatProfileCommunitiesLink({
      profileId
    }).path
  }

  return {
    icon: 'users',
    title: formatTitle(),
    path: formatPath()
  }
}
