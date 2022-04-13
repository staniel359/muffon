import i18n from '*/plugins/i18n'
import {
  communities as formatProfileCommunitiesLink
} from '*/helpers/formatters/links/profile'

export default function (
  {
    profileId,
    profileNickname
  }
) {
  function formatTitle () {
    return i18n.global.t(
      'navigation.model.communities',
      {
        modelName: profileNickname
      }
    )
  }

  const {
    path
  } = formatProfileCommunitiesLink(
    {
      profileId
    }
  )

  return {
    icon: 'users',
    title: formatTitle(),
    path
  }
}
