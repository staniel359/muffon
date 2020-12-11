export default function handleTagChange (prevProps) {
  const { tagName } = this.params()

  const prevTagName = prevProps.match.params.tagName
  const isTagChanged = tagName !== prevTagName

  if (isTagChanged) {
    this.setNavSections(tagName)

    const resetState = {
      tagName: null,
      data: null,
      isLoaded: false,
      artistImages: null
    }

    this.setState(resetState)

    this.getData()
  }
}
