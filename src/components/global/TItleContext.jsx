import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import Title from './Title'

export default class TitleContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const { audioStatus, currentTrack } = context

          const titleProps = { audioStatus, currentTrack }

          return <Title {...titleProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
