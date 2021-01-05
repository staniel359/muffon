import React from 'react'
import { Button } from 'semantic-ui-react'

export default class ShuffleButton extends React.PureComponent {
  render () {
    const { isShuffle, toggleShuffle } = this.props

    return (
      <Button
        basic={!isShuffle}
        compact
        icon="shuffle"
        onClick={toggleShuffle}
      />
    )
  }
}
