import React from 'react'
import { Button } from 'semantic-ui-react'

export default class RepeatButton extends React.PureComponent {
  render () {
    const { isRepeat, toggleRepeat } = this.props

    return (
      <Button
        compact
        size="tiny"
        icon="redo alternate"
        basic={!isRepeat}
        onClick={toggleRepeat}
      />
    )
  }
}
