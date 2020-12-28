import React from 'react'
import { Helmet } from 'react-helmet'
import PlayerContext from 'contexts/PlayerContext'

export default class Title extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const { audioStatus, currentTrack } = context

          const audioStatusIcon = () => {
            switch (audioStatus) {
              case 'play':
                return '❚❚'
              case 'pause':
                return '▶'
              default:
                return ''
            }
          }

          const titleData = () => {
            if (currentTrack) {
              const { artist, title } = currentTrack

              return `${audioStatusIcon()} ${artist} - ${title} | muffon`
            } else {
              return 'muffon'
            }
          }

          return (
            <Helmet>
              <title>{titleData()}</title>
            </Helmet>
          )
        }}
      </PlayerContext.Consumer>
    )
  }
}
