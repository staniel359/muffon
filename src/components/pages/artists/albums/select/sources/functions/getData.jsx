export default function getData () {
  const { source } = this.props

  const sourceId = source.id

  if (source.types) {
    const typeIds = Object.keys(source.types)

    const getSourceTypeData = typeId => {
      this.getSourceData({ sourceId, typeId })
    }

    typeIds.map(getSourceTypeData)
  } else {
    this.getSourceData({ sourceId })
  }
}
