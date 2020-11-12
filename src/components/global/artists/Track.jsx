import React from 'react'
import { List, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PlayButton from 'global/player/buttons/Play'
import PlayerContext from 'contexts/PlayerContext'
import 'styles/global/Track.sass'

export default class Track extends React.PureComponent {
  static contextType = PlayerContext

  counterData () {
    const { track, topTrackCount } = this.props

    const listenersCount = track.listeners_count
    const trackLineWidth = `${(listenersCount / topTrackCount) * 70}%`

    const trackCounterData = listenersCount.toLocaleString('eu')

    return (
      <List.Description className="trackContentCounter">
        <div
          className="trackContentCounterLine"
          style={{ width: trackLineWidth }}
        />
        <div>
          <Icon name="user" />
          {trackCounterData}
        </div>
      </List.Description>
    )
  }

  lengthData () {
    const { track } = this.props

    const format = seconds =>
      new Date(seconds * 1000).toISOString().substr(14, 5)
    const trackLength = format(track.length)

    return (
      <List.Description className="trackContentLength" content={trackLength} />
    )
  }

  render () {
    const { artistName, track, index } = this.props
    const { currentTrackId } = this.context

    const trackId = track.id
    const isPlaying = currentTrackId === trackId

    const trackTitle = track.title
    const playButtonProps = { artistName, trackTitle, trackId }

    const indexData = <div className="trackContentIndex">{`${index + 1}.`}</div>

    const artistNameEncoded = encodeURIComponent(artistName)
    const trackTitleEncoded = encodeURIComponent(trackTitle)
    const trackPageLink = `/artists/${artistNameEncoded}/tracks/${trackTitleEncoded}`

    return (
      <List.Item className="track" active={isPlaying}>
        <PlayButton {...playButtonProps} />

        <List.Content className="trackContent">
          <div className="trackContentMain">
            <div className="trackContentIndexLink">
              {index >= 0 && indexData}

              <Link className="trackContentLink" to={trackPageLink}>
                <List.Header as="h4" content={trackTitle} />
              </Link>
            </div>

            {track.length && this.lengthData()}
          </div>

          {track.listeners_count && this.counterData()}
        </List.Content>
      </List.Item>
    )
  }
}
