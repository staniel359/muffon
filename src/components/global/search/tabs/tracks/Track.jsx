import React from 'react'
import { List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PlayButton from 'global/player/buttons/Play'
import PlayerContext from 'contexts/PlayerContext'

export default class Track extends React.PureComponent {
  render () {
    const { track, hideSearch, isPlaying } = this.props

    const artistName = track.artist
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

    const artistNameEncoded = encodeURIComponent(artistName)
    const trackTitleEncoded = encodeURIComponent(trackTitle)
    const trackLink = `/artists/${artistNameEncoded}/tracks/${trackTitleEncoded}`
    const trackData = (
      <List.Content
        className="searchItemContent"
        as={Link}
        to={trackLink}
        onClick={hideSearch}
      >
        <List.Header as="h4" content={trackTitle} />
        <List.Description content={artistName} />
      </List.Content>
    )

    return (
      <List.Item className="searchItem" active={isPlaying}>
        {playButtonData}

        {trackData}
      </List.Item>
    )
  }
}
