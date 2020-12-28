import React from 'react'
import axios from 'axios'
import { Select } from 'semantic-ui-react'
import getAlbumsData from './functions/getAlbumsData'
import { v4 as uuid } from 'uuid'

export default class BandcampSelect extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }

    this.getAlbumsData = getAlbumsData.bind(this)
  }

  componentDidMount () {
    this.request = axios.CancelToken.source()

    this.getAlbumsData()
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  textData () {
    const { data, albumIndex } = this.state

    const album = data && data[albumIndex]

    return album ? album.title : 'On Bandcamp'
  }

  albumsData () {
    const { data } = this.state

    const albumData = (album, index) => {
      const { albumIndex } = this.state
      const { getAlbumData } = this.props

      const selected = index === albumIndex

      const handleClick = () => {
        this.setState({ albumIndex: index })

        getAlbumData(album.link)
      }

      return {
        key: uuid(),
        active: selected,
        selected: selected,
        text: album.title,
        onClick: handleClick
      }
    }

    return data.map(albumData)
  }

  render () {
    const { data, isLoading } = this.state

    const albumsData = data ? this.albumsData() : []

    const isDisabled = !data || data.length === 0

    const textData = !isLoading ? this.textData() : ''

    return (
      <Select
        button
        fluid
        labeled
        className="icon bandcampSelect"
        icon="bandcamp"
        options={albumsData}
        disabled={isDisabled}
        loading={isLoading}
        text={textData}
      />
    )
  }
}
