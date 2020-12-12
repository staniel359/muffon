import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import Main from './Main'

export default class MainContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const {
            isShuffle,
            toggleShuffle,
            toggleAudio,
            audioStatus,
            isRepeat,
            toggleRepeat
          } = context

          const mainProps = {
            isShuffle,
            toggleShuffle,
            toggleAudio,
            audioStatus,
            isRepeat,
            toggleRepeat
          }

          return <Main {...mainProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
