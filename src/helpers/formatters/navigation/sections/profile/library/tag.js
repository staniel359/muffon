import {
  main as formatProfileLibraryTagLink
} from '@/helpers/formatters/links/profile/library/tag'

export default function (
  {
    profileId,
    libraryTagId,
    tagName,
    isActive
  }
) {
  function formatLink () {
    if (!isActive) {
      return formatProfileLibraryTagLink(
        {
          profileId,
          libraryTagId
        }
      )
    }
  }

  return {
    name: tagName,
    isActive,
    link: formatLink()
  }
}
