import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import ForwardButton from './ForwardButton'

export default class ForwardButtonContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const { isQueueEnd, getQueueNextTrack } = context

          const forwardButtonProps = {
            isQueueEnd: isQueueEnd(),
            getQueueNextTrack
          }

          return <ForwardButton {...forwardButtonProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
