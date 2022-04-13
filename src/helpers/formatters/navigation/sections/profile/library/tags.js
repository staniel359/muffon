import i18n from '*/plugins/i18n'
import {
  tags as formatProfileLibraryTagsLink
} from '*/helpers/formatters/links/profile/library'

export default function (
  {
    profileId
  }
) {
  return {
    name: i18n.global.t(
      'navigation.tags'
    ),
    link: formatProfileLibraryTagsLink(
      {
        profileId
      }
    )
  }
}
