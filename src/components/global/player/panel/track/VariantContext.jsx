import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import Variant from './Variant'

export default class VariantContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const { variant, index } = this.props
          const { getVkAudio, currentTrackIndex } = context

          const variantProps = { variant, index, getVkAudio, currentTrackIndex }

          return <Variant {...variantProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
