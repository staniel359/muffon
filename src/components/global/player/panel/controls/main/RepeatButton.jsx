import React from 'react'
import { Button } from 'semantic-ui-react'

export default class RepeatButton extends React.PureComponent {
  render () {
    const { isRepeat, toggleRepeat } = this.props

    return (
      <Button
        basic={!isRepeat}
        compact
        icon="redo alternate"
        onClick={toggleRepeat}
      />
    )
  }
}
