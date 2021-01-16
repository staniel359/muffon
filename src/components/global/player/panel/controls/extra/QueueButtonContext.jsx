import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import QueueButton from './QueueButton'

export default class QueueButtonContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const { queue, toggleQueuePanel } = context

          const queueButtonProps = { queue, toggleQueuePanel }

          return <QueueButton {...queueButtonProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
