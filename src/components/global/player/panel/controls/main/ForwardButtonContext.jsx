import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import ForwardButton from './ForwardButton'

export default class ForwardButtonContext extends React.PureComponent {
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

          const forwardButtonProps = {
            currentAlbum,
            currentAlbumTrackIndex,
            getTrack,
            setContext
          }

          return <ForwardButton {...forwardButtonProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
