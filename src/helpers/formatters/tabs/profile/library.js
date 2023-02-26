import i18n from '#/plugins/i18n'
import {
  main as formatProfileLibraryMainLink,
  artists as formatProfileLibraryArtistsLink,
  albums as formatProfileLibraryAlbumsLink,
  tracks as formatProfileLibraryTracksLink,
  tags as formatProfileLibraryTagsLink
} from '@/helpers/formatters/links/profile/library'

export default function (
  {
    profileId,
    profileNickname,
    scope
  }
) {
  function formatTitle () {
    if (scope) {
      return i18n.global.t(
        `navigation.model.${scope}`,
        {
          modelName: profileNickname
        }
      )
    } else {
      return i18n.global.t(
        'navigation.model.library',
        {
          modelName: profileNickname
        }
      )
    }
  }

  const title = formatTitle()

  function formatLink () {
    switch (scope) {
      case 'artists':
        return formatProfileLibraryArtistsLink(
          {
            profileId
          }
        )
      case 'albums':
        return formatProfileLibraryAlbumsLink(
          {
            profileId
          }
        )
      case 'tracks':
        return formatProfileLibraryTracksLink(
          {
            profileId
          }
        )
      case 'tags':
        return formatProfileLibraryTagsLink(
          {
            profileId
          }
        )
      default:
        return formatProfileLibraryMainLink(
          {
            profileId
          }
        )
    }
  }

  const link = formatLink()

  return {
    icon: 'library',
    title,
    link,
    path: link.path
  }
}
