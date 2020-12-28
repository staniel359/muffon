import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import Variants from './Variants'

export default class VariantsContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const { cancelTrackRequest, currentTrackVariants } = context

          const variantsProps = { cancelTrackRequest, currentTrackVariants }

          return <Variants {...variantsProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
