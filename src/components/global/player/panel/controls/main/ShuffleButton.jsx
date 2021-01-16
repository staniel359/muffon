import React from 'react'
import { Button } from 'semantic-ui-react'

export default class ShuffleButton extends React.PureComponent {
  render () {
    const { queue, isShuffle, toggleShuffle } = this.props

    return (
      <Button
        compact
        size="tiny"
        icon="shuffle"
        disabled={!queue}
        basic={!isShuffle}
        onClick={toggleShuffle}
      />
    )
  }
}
