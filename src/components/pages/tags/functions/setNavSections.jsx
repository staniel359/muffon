export default function setNavSections () {
  const { tag } = this.state
  const { params } = this.props.match

  const isTagPage = this.dataName === 'tag'

  const tagName = tag ? tag.name : params.tagName

  const tagNameEncoded = encodeURIComponent(tagName)
  const tagPageLink = `#/tags/${tagNameEncoded}`

  const navSections = () => {
    if (isTagPage) {
      return [
        { content: 'Tags' },
        { content: decodeURIComponent(tagName), active: true }
      ]
    } else {
      return [
        { content: 'Tags' },
        { content: decodeURIComponent(tagName), href: tagPageLink },
        { content: this.navSectionData, active: true }
      ]
    }
  }

  this.props.setNavSections(navSections())
}
