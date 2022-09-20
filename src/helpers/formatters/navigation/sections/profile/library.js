import i18n from '@/plugins/i18n'
import {
  main as formatProfileLibraryMainLink
} from '@/helpers/formatters/links/profile/library'

export default function (
  {
    profileId,
    isActive
  }
) {
  function formatLink () {
    if (!isActive) {
      return formatProfileLibraryMainLink(
        {
          profileId
        }
      )
    }
  }

  return {
    name: i18n.global.t(
      'navigation.library'
    ),
    isActive,
    link: formatLink()
  }
}
