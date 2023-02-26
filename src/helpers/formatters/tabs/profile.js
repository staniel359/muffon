import i18n from '#/plugins/i18n'
import {
  main as formatProfileMainLink,
  posts as formatProfilePostsLink,
  playlists as formatProfilePlaylistsLink,
  communities as formatProfileCommunitiesLink
} from '@/helpers/formatters/links/profile'

export default function (
  {
    profileId,
    profileNickname,
    scope
  }
) {
  function formatIcon () {
    switch (scope) {
      case 'posts':
        return 'post'
      case 'playlists':
        return 'playlist'
      case 'communities':
        return 'community'
      default:
        return 'profile'
    }
  }

  const icon = formatIcon()

  function formatTitle () {
    if (scope) {
      return i18n.global.t(
        `navigation.model.${scope}`,
        {
          modelName: profileNickname
        }
      )
    } else {
      return profileNickname
    }
  }

  const title = formatTitle()

  function formatLink () {
    switch (scope) {
      case 'posts':
        return formatProfilePostsLink(
          {
            profileId
          }
        )
      case 'playlists':
        return formatProfilePlaylistsLink(
          {
            profileId
          }
        )
      case 'communities':
        return formatProfileCommunitiesLink(
          {
            profileId
          }
        )
      default:
        return formatProfileMainLink(
          {
            profileId
          }
        )
    }
  }

  const link = formatLink()

  return {
    icon,
    title,
    link,
    path: link.path
  }
}
