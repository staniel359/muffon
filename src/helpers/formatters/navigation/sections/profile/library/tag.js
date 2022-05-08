import {
  main as formatProfileLibraryTagMainLink
} from '*/helpers/formatters/links/profile/library/tag'

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
      return formatProfileLibraryTagMainLink(
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
