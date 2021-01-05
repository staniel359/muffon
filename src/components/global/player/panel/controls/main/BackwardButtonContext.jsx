import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import BackwardButton from './BackwardButton'

export default class BackwardButtonContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const {
            currentAlbum,
            currentAlbumTrackIndex,
            getTrack,
            setContext
          } = context

          const backwardButtonProps = {
            currentAlbum,
            currentAlbumTrackIndex,
            getTrack,
            setContext
          }

          return <BackwardButton {...backwardButtonProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
