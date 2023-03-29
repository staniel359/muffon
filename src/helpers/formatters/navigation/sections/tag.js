import {
  main as formatTagLink
} from '@/helpers/formatters/links/tag'

export default function (
  {
    tagName,
    isActive
  }
) {
  function formatLink () {
    if (!isActive) {
      return formatTagLink(
        {
          tagName
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
