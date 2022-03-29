import i18n from '*/plugins/i18n'
import {
  main as formatProfileMainLink
} from '*/helpers/formatters/links/profile'
import {
  main as formatProfileLibraryMainLink
} from '*/helpers/formatters/links/profile/library'

export default function ({ profileId, profileNickname, pageNameKey }) {
  const formatTitle = () => {
    if (pageNameKey) {
      return i18n.global.t(
        `navigation.model.${pageNameKey}`,
        { modelName: profileNickname }
      )
    } else {
      return profileNickname
    }
  }

  const formatPath = () => {
    switch (pageNameKey) {
      case 'library':
        return formatProfileLibraryMainLink({
          profileId
        }).path
      default:
        return formatProfileMainLink({
          profileId
        }).path
    }
  }

  return {
    icon: 'user',
    title: formatTitle(),
    path: formatPath()
  }
}
