import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import Variant from './Variant'

export default class VariantContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const { variant } = this.props
          const { getTrackVariant, currentTrackAudioId } = context

          const variantProps = {
            variant,
            getTrackVariant,
            currentTrackAudioId
          }

          return <Variant {...variantProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
