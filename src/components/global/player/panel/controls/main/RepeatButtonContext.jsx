import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import RepeatButton from './RepeatButton'

export default class RepeatButtonContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const { isRepeat, toggleRepeat } = context

          const repeatButtonProps = { isRepeat, toggleRepeat }

          return <RepeatButton {...repeatButtonProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
