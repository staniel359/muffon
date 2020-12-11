export default function setNavSections (tagName) {
  const tagNameEncoded = encodeURIComponent(tagName)
  const tagPageLink = `#/tags/${tagNameEncoded}`

  const isTagPage = this.dataName === 'tag'

  const navSections = [
    { content: 'Tags' },
    {
      content: decodeURIComponent(tagName),
      ...(isTagPage ? { active: true } : { href: tagPageLink })
    },
    !isTagPage && { content: this.navSectionData, active: true }
  ].filter(e => e)

  this.props.setNavSections(navSections)
}
