import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import BackwardButton from './BackwardButton'

export default class BackwardButtonContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const { isQueueStart, getQueueNextTrack } = context

          const backwardButtonProps = {
            isQueueStart: isQueueStart(),
            getQueueNextTrack
          }

          return <BackwardButton {...backwardButtonProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
