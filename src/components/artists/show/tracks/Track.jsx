import React from 'react'
import { List, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PlayButton from 'global/player/buttons/Play'

export default class Track extends React.PureComponent {
  render () {
    const { artistName, track, topTrackCount } = this.props

    const trackTitle = track.title
    const trackId = track.id
    const playButton = <PlayButton {...{ artistName, trackTitle, trackId }} />

    const artistNameEncoded = encodeURIComponent(artistName)
    const trackTitleEncoded = encodeURIComponent(trackTitle)
    const pageLink = `/artists/${artistNameEncoded}/tracks/${trackTitleEncoded}`

    const listenersCount = track.listeners_count
    const trackLineWidth = `${(listenersCount / topTrackCount) * 70}%`
    const listenersData = listenersCount.toLocaleString('eu')
    const trackCounter = (
      <div className="artistPageTrackCounter">
        <div className="inner trackLine" style={{ width: trackLineWidth }} />
        <div className="inner">
          <Icon name="user" />
          {listenersData}
        </div>
      </div>
    )

    return (
      <List.Item>
        <List.Icon verticalAlign="middle">{playButton}</List.Icon>

        <List.Content as={Link} to={pageLink}>
          <List.Header as="h4" content={trackTitle} />
          <List.Description content={trackCounter} />
        </List.Content>
      </List.Item>
    )
  }
}
