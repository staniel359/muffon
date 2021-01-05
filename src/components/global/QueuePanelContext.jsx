import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import QueuePanel from './QueuePanel'

export default class QueuePanelContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const {
            currentAlbum,
            currentAlbumSource,
            isQueuePanelVisible
          } = context

          const queuePanelProps = {
            currentAlbum,
            currentAlbumSource,
            isQueuePanelVisible
          }

          return <QueuePanel {...queuePanelProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
