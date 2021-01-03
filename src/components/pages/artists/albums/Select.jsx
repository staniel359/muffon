import React from 'react'
import SourceSelect from './select/Sources'
import AlbumSelect from './select/Albums'

export default class Select extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    const { album } = this.props

    this.setState({ album })
  }

  sourceSelectData () {
    const { currentSource } = this.state

    const setCurrentSource = source => this.setState({ currentSource: source })
    const sourceSelectDataProps = { currentSource, setCurrentSource }

    return <SourceSelect {...sourceSelectDataProps} />
  }

  albumSelectData () {
    const { album, currentSource } = this.state
    const {
      getLastfmAlbumData,
      getVkAlbumData,
      getBandcampAlbumData,
      getSoundCloudAlbumData
    } = this.props

    const getAlbumData = {
      lastfm: getLastfmAlbumData,
      vk: getVkAlbumData,
      bandcamp: getBandcampAlbumData,
      soundcloud: getSoundCloudAlbumData
    }[currentSource.key]

    const selectDataProps = {
      key: currentSource.key,
      artistName: album.artist,
      albumTitle: album.title,
      source: currentSource.key,
      getAlbumData
    }

    return <AlbumSelect {...selectDataProps} />
  }

  render () {
    const { currentSource } = this.state

    const albumSelectData = currentSource && this.albumSelectData()

    return (
      <div>
        {this.sourceSelectData()}
        {albumSelectData}
      </div>
    )
  }
}
