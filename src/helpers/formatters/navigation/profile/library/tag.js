import i18n from '&/i18n'
import { profiles as formatProfilesLink } from '#/formatters/links'
import { main as formatProfileMainLink } from '#/formatters/links/profile'
import {
  main as formatProfileLibraryMainLink,
  tags as formatProfileLibraryTagsLink
} from '#/formatters/links/profile/library'
import {
  main as formatProfileLibraryTagMainLink
} from '#/formatters/links/profile/library/tag'

export default function ({
  profileId,
  profileNickname,
  tagId,
  tagName,
  pageNameKey
}) {
  const formatLink = () => {
    if (pageNameKey) {
      return formatProfileLibraryTagMainLink({
        profileId,
        tagId
      })
    }
  }

  const formatSubpageSection = () => {
    if (pageNameKey) {
      return {
        name: i18n.global.t(
          `navigation.${pageNameKey}`
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
      isActive: !pageNameKey,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
