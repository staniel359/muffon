import React from 'react'
import { List, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PlayButton from 'global/player/buttons/Play'
import PlayerContext from 'contexts/PlayerContext'
import 'styles/global/Track.sass'

export default class Track extends React.PureComponent {
  lengthData () {
    const { track } = this.props

    const format = seconds =>
      new Date(seconds * 1000).toISOString().substr(14, 5)
    const trackLength = format(track.length)

    return (
      <List.Description className="trackContentLength" content={trackLength} />
    )
  }

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
        <div className="trackContentCounterData">
          <Icon name="user" size="small" />
          {trackCounterData}
        </div>
      </List.Description>
    )
  }

  render () {
    const { artistName, track, index, isPlaying } = this.props

    const trackTitle = track.title
    const trackId = track.id
    const playButtonProps = { artistName, trackTitle, trackId, isPlaying }
    const playButtonData = (
      <PlayerContext.Consumer>
        {context => {
          const audioStatus = isPlaying && context.audioStatus
          const toggleAudio = context.toggleAudio
          const playButtonGlobalProps = { audioStatus, toggleAudio }

          return <PlayButton {...playButtonProps} {...playButtonGlobalProps} />
        }}
      </PlayerContext.Consumer>
    )

    const indexData = index >= 0 && (
      <div className="trackContentIndex">{`${index + 1}.`}</div>
    )

    const artistNameEncoded = encodeURIComponent(artistName)
    const trackTitleEncoded = encodeURIComponent(trackTitle)
    const trackPageLink = `/artists/${artistNameEncoded}/tracks/${trackTitleEncoded}`

    const trackData = (
      <List.Content className="trackContent">
        <div className="trackContentMain">
          <div className="trackContentIndexLink">
            {indexData}

            <Link className="trackContentLink" to={trackPageLink}>
              <List.Header as="h4" content={trackTitle} />
            </Link>
          </div>

          {track.length && this.lengthData()}
        </div>

        {track.listeners_count && this.counterData()}
      </List.Content>
    )

    return (
      <List.Item className="track" active={isPlaying}>
        {playButtonData}

        {trackData}
      </List.Item>
    )
  }
}
