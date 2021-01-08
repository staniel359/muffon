import React from 'react'
import { Button } from 'semantic-ui-react'
import getData from './functions/getData'

export default class ForwardButton extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }

    this.getData = getData.bind(this)
  }

  render () {
    const { isLoading } = this.state
    const { isQueueEnd } = this.props

    const isDisabled = isQueueEnd || isLoading
    const handleClick = () => this.getData('forward')

    return (
      <Button
        basic
        compact
        size="tiny"
        icon="forward"
        disabled={isDisabled}
        loading={isLoading}
        onClick={handleClick}
      />
    )
  }
}
