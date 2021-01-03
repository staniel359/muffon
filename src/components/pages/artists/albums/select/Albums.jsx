import React from 'react'
import axios from 'axios'
import { Select } from 'semantic-ui-react'
import getAlbumsData from './functions/getAlbumsData'
import { v4 as uuid } from 'uuid'

export default class Albums extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }

    this.getAlbumsData = getAlbumsData.bind(this)
  }

  componentDidMount () {
    const { source } = this.props

    this.request = axios.CancelToken.source()

    this.getAlbumsData(source)
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  fullTitle = album => {
    const { source } = this.props

    if (source === 'bandcamp') {
      return album.title
    } else {
      return `${album.artist} - ${album.title}`
    }
  }

  textData () {
    const { data, albumIndex } = this.state

    const album = data && data[albumIndex]

    return album ? this.fullTitle(album) : 'Select album'
  }

  albumData = (album, index) => {
    const { albumIndex } = this.state
    const { getAlbumData, source } = this.props

    const selected = index === albumIndex

    const albumDataArgs = {
      lastfm: [album.artist, album.title],
      vk: [album.vk_id, album.vk_owner_id, album.vk_access_hash],
      bandcamp: [album.link],
      soundcloud: [album.soundcloud_id]
    }[source]

    const handleClick = () => {
      this.setState({ albumIndex: index })

      getAlbumData(...albumDataArgs)
    }

    return {
      key: uuid(),
      active: selected,
      selected: selected,
      text: this.fullTitle(album),
      onClick: handleClick
    }
  }

  render () {
    const { data, isLoading } = this.state

    const albumsData = data ? data.map(this.albumData) : []

    const isDisabled = !data || data.length === 0

    const textData = !isLoading ? this.textData() : ''

    return (
      <Select
        button
        fluid
        options={albumsData}
        disabled={isDisabled}
        loading={isLoading}
        text={textData}
      />
    )
  }
}
