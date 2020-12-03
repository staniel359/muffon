import React from 'react'
import { Segment, Image, Header } from 'semantic-ui-react'
import PlayerContextWrap from '../PlayerContextWrap'
import { Link } from 'react-router-dom'

export default class Main extends React.PureComponent {
  render () {
    const { track } = this.props
    const { covers } = track.album

    const defaultCover =
      'https://lastfm.freetls.fastly.net/i/u/174s/' +
      'c6f59c1e5e7240a4c0d427abd71f3dbb.png'
    const cover = covers ? covers.small : defaultCover
    const coverData = (
      <Image wrapped className="trackPageCardCover" src={cover} />
    )

    const trackTitleData = <Header as="h3" content={track.title} />

    const artistPageLink = `/artists/${track.artist}`
    const artistNameData = (
      <Header as="h4">
        <Link to={artistPageLink}>{track.artist}</Link>
      </Header>
    )

    const albumPageLink = `/artists/${track.artist}/albums/${track.album.title}`
    const albumTitleData = <Link to={albumPageLink}>{track.album.title}</Link>

    const contentData = (
      <div className="trackPageCardContent">
        {trackTitleData}
        {artistNameData}
        {albumTitleData}
      </div>
    )

    const playerProps = { track }
    const playerData = <PlayerContextWrap {...playerProps} />

    return (
      <Segment.Group horizontal className="trackPageCard">
        {coverData}

        <Segment className="trackPageCardContentWrap">
          {contentData}
          {playerData}
        </Segment>
      </Segment.Group>
    )
  }
}
