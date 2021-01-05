import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import QueueButton from './QueueButton'

export default class QueueButtonContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const { toggleQueuePanel } = context

          const queueButtonProps = { toggleQueuePanel }

          return <QueueButton {...queueButtonProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
