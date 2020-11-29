import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import ChangeTrackButton from './ChangeTrack'

export default class ChangeTrackContextWrap extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const { currentTrackData, getTrackData, cancelTrackRequest } = context
          const changeTrackButtonProps = {
            currentTrackData,
            getTrackData,
            cancelTrackRequest
          }

          return <ChangeTrackButton {...changeTrackButtonProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
