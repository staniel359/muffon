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

  function formatPath () {
    switch (scope) {
      case 'posts':
        return formatProfilePostsLink(
          {
            profileId
          }
        ).path
      case 'playlists':
        return formatProfilePlaylistsLink(
          {
            profileId
          }
        ).path
      case 'communities':
        return formatProfileCommunitiesLink(
          {
            profileId
          }
        ).path
      default:
        return formatProfileMainLink(
          {
            profileId
          }
        ).path
    }
  }

  return {
    icon: formatIcon(),
    title: formatTitle(),
    path: formatPath()
  }
}
