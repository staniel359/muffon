import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import QueuePanel from './QueuePanel'

export default class QueuePanelContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const {
            queue,
            isQueuePanelVisible,
            hideQueuePanel,
            resetQueue
          } = context

          const queuePanelProps = {
            queue,
            isQueuePanelVisible,
            hideQueuePanel,
            resetQueue
          }

          return <QueuePanel {...queuePanelProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
