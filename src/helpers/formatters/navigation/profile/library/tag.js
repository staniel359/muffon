import i18n from '*/plugins/i18n'
import { profiles as formatProfilesLink } from '*/helpers/formatters/links'
import {
  main as formatProfileMainLink
} from '*/helpers/formatters/links/profile'
import {
  main as formatProfileLibraryMainLink,
  tags as formatProfileLibraryTagsLink
} from '*/helpers/formatters/links/profile/library'
import {
  main as formatProfileLibraryTagMainLink
} from '*/helpers/formatters/links/profile/library/tag'

export default function ({
  profileId,
  profileNickname,
  tagId,
  tagName,
  scope
}) {
  const formatLink = () => {
    if (scope) {
      return formatProfileLibraryTagMainLink({
        profileId,
        tagId
      })
    }
  }

  const formatSubpageSection = () => {
    if (scope) {
      return {
        name: i18n.global.t(
          `navigation.${scope}`
        ),
        isActive: true
      }
    }
  }

  return [
    {
      name: i18n.global.t(
        'navigation.profiles'
      ),
      link: formatProfilesLink()
    },
    {
      name: profileNickname,
      link: formatProfileMainLink({
        profileId
      })
    },
    {
      name: i18n.global.t(
        'navigation.library'
      ),
      link: formatProfileLibraryMainLink({
        profileId
      })
    },
    {
      name: i18n.global.t(
        'navigation.tags'
      ),
      link: formatProfileLibraryTagsLink({
        profileId
      })
    },
    {
      name: tagName,
      isActive: !scope,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
