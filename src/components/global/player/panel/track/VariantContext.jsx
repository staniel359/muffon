import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import Variant from './Variant'

export default class VariantContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const { variant, index } = this.props
          const { getAudio, currentTrack } = context

          const variantProps = { variant, index, getAudio, currentTrack }

          return <Variant {...variantProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
