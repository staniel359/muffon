import i18n from '*/plugins/i18n'
import {
  posts as formatProfilePostsLink
} from '*/helpers/formatters/links/profile'

export default function (
  {
    profileId,
    profileNickname
  }
) {
  function formatTitle () {
    return i18n.global.t(
      'navigation.model.posts',
      {
        modelName: profileNickname
      }
    )
  }

  const {
    path
  } = formatProfilePostsLink(
    {
      profileId
    }
  )

  return {
    icon: 'edit',
    title: formatTitle(),
    path
  }
}
