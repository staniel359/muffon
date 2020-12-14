import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import Variants from './Variants'

export default class VariantsContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const { cancelTrackRequest, currentTrack } = context
          const { variants } = currentTrack

          const variantsProps = { variants, cancelTrackRequest }

          return <Variants {...variantsProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
