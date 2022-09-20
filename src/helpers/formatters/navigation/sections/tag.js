import {
  main as formatTagMainLink
} from '@/helpers/formatters/links/tag'

export default function (
  {
    tagName,
    isActive
  }
) {
  function formatLink () {
    if (!isActive) {
      return formatTagMainLink(
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
