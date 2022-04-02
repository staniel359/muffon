import {
  main as formatProfileLibraryTagMainLink
} from '*/helpers/formatters/links/profile/library/tag'

export default function ({
  profileId,
  tagId,
  tagName,
  isActive
}) {
  const formatLink = () => {
    if (!isActive) {
      return formatProfileLibraryTagMainLink({
        profileId,
        tagId
      })
    }
  }

  return {
    name: tagName,
    isActive,
    link: formatLink()
  }
}
