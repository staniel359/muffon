import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import ShuffleButton from './ShuffleButton'

export default class ShuffleButtonContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const { queue, isShuffle, toggleShuffle } = context

          const shuffleButtonProps = { queue, isShuffle, toggleShuffle }

          return <ShuffleButton {...shuffleButtonProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
