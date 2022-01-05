import i18n from '&/i18n'
import {
  main as formatProfileLibraryTagMainLink,
  artists as formatProfileLibraryTagArtistsLink
} from '#/formatters/links/profile/library/tag'

export default function ({
  profileId,
  profileNickname,
  tagId,
  tagName,
  pageNameKey
}) {
  const formatProfileLibraryTagPageTitle = () => {
    if (pageNameKey) {
      return i18n.global.t(
        `navigation.model.${pageNameKey}`,
        { modelName: tagName }
      )
    } else {
      return tagName
    }
  }

  const profileLibraryPageTitle = i18n.global.t(
    'navigation.model.tags',
    { modelName: profileNickname }
  )

  const title = [
    formatProfileLibraryTagPageTitle(),
    profileLibraryPageTitle
  ].join(' | ')

  const formatPath = () => {
    switch (pageNameKey) {
      case 'artists':
        return formatProfileLibraryTagArtistsLink({
          profileId,
          tagId
        }).path
      default:
        return formatProfileLibraryTagMainLink({
          profileId,
          tagId
        }).path
    }
  }

  return {
    icon: 'tag',
    title,
    path: formatPath()
  }
}
