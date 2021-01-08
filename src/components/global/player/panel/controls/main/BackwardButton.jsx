import React from 'react'
import { Button } from 'semantic-ui-react'
import getData from './functions/getData'

export default class BackwardButton extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }

    this.getData = getData.bind(this)
  }

  render () {
    const { isLoading } = this.state
    const { isQueueStart } = this.props

    const isDisabled = isQueueStart || isLoading
    const handleClick = () => this.getData('backward')

    return (
      <Button
        basic
        compact
        size="tiny"
        icon="backward"
        disabled={isDisabled}
        loading={isLoading}
        onClick={handleClick}
      />
    )
  }
}
