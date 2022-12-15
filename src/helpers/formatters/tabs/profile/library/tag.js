import i18n from '#/plugins/i18n'
import {
  main as formatProfileLibraryTagMainLink,
  artists as formatProfileLibraryTagArtistsLink
} from '@/helpers/formatters/links/profile/library/tag'

export default function (
  {
    profileId,
    profileNickname,
    libraryTagId,
    tagName,
    scope
  }
) {
  function formatProfileLibraryTagPageTitle () {
    if (scope) {
      return i18n.global.t(
        `navigation.model.${scope}`,
        {
          modelName: tagName
        }
      )
    } else {
      return tagName
    }
  }

  const profileLibraryPageTitle =
    i18n.global.t(
      'navigation.model.tags',
      {
        modelName: profileNickname
      }
    )

  const title = [
    formatProfileLibraryTagPageTitle(),
    profileLibraryPageTitle
  ].join(
    ' | '
  )

  function formatPath () {
    switch (scope) {
      case 'artists':
        return formatProfileLibraryTagArtistsLink(
          {
            profileId,
            libraryTagId
          }
        ).path
      default:
        return formatProfileLibraryTagMainLink(
          {
            profileId,
            libraryTagId
          }
        ).path
    }
  }

  return {
    icon: 'tag',
    title,
    path: formatPath()
  }
}
