import React from 'react'
import SourceSelect from './select/Sources'
import AlbumSelect from './select/Albums'
import TypeSelect from './select/Types'
import sourcesList from './select/functions/sourcesList'

export default class Select extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      selectedSource: null,
      selectedType: null,
      selectedAlbum: null
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const isChanged = dataName => {
      return this.state[dataName] !== prevState[dataName]
    }

    if (isChanged('selectedSource')) {
      this.setState({ selectedType: null, selectedAlbum: null })
    }

    if (isChanged('selectedType')) {
      this.setState({ selectedAlbum: null })
    }

    if (isChanged('selectedAlbum')) {
      const { selectedAlbum } = this.state
      const { getAlbumData, setRequestData } = this.props

      if (selectedAlbum) {
        const album = selectedAlbum.requestData

        getAlbumData({ album })
        setRequestData(album)
      }
    }
  }

  sourceSelectData () {
    const { selectedSource } = this.state
    const { requestData } = this.props

    const formatSource = ([id, data]) => ({ id, ...data })
    const sources = Object.entries(sourcesList()).map(formatSource)
    const setSelectedSource = source => {
      this.setState({ selectedSource: source })
    }
    const setSelectedSourceData = sourceData => {
      this.setState({ selectedSourceData: sourceData })
    }

    const sourceSelectProps = {
      selectedSource,
      sources,
      requestData,
      setSelectedSource,
      setSelectedSourceData
    }

    return <SourceSelect {...sourceSelectProps} />
  }

  selectedSourceData () {
    const { selectedSource } = this.state

    const typeSelectData = !!selectedSource.types && this.typeSelectData()
    const albumSelectData = !!this.albumsData() && this.albumSelectData()

    return (
      <React.Fragment>
        {typeSelectData}
        {albumSelectData}
      </React.Fragment>
    )
  }

  albumsData () {
    const { selectedSourceData, selectedSource, selectedType } = this.state

    const selectedTypeId = selectedType && selectedType.id
    const typeId = selectedSource.types ? selectedTypeId : 'albums'

    return selectedSourceData[typeId]
  }

  typeSelectData () {
    const { selectedSourceData, selectedType, selectedSource } = this.state

    const data = selectedSourceData
    const formatType = ([id, { name }]) => ({ id, name })
    const types = Object.entries(selectedSource.types).map(formatType)
    const setSelectedType = type => this.setState({ selectedType: type })

    const typeSelectProps = { data, selectedType, types, setSelectedType }

    return <TypeSelect {...typeSelectProps} />
  }

  albumSelectData () {
    const { selectedAlbum, selectedSource, selectedType } = this.state

    const albums = this.albumsData()
    const isOnlyTitle = !!selectedSource.onlyTitle
    const selectedSourceId = selectedSource.id
    const selectedTypeId = selectedType && selectedType.id
    const setSelectedAlbum = album => this.setState({ selectedAlbum: album })

    const albumSelectProps = {
      albums,
      selectedAlbum,
      isOnlyTitle,
      selectedSourceId,
      selectedTypeId,
      setSelectedAlbum
    }

    return <AlbumSelect {...albumSelectProps} />
  }

  render () {
    const { selectedSource } = this.state

    const selectedSourceData = !!selectedSource && this.selectedSourceData()

    return (
      <div>
        {this.sourceSelectData()}
        {selectedSourceData}
      </div>
    )
  }
}
