import React from 'react'
import { Message } from 'semantic-ui-react'

export default class ErrorData extends React.PureComponent {
  render () {
    const { response } = this.props.error

    const errorCode = response && response.status

    const notFoundError = errorCode === 404 && (
      <Message
        icon="search"
        header="Nothing was found"
        content="Try looking for something else."
      />
    )

    const timeoutError = errorCode === 504 && (
      <Message
        icon="clock outline"
        header="Gateway timeout"
        content="Please try again in a moment."
      />
    )

    const connectionError = (
      <Message
        icon="exclamation circle"
        header="Connection lost"
        content="We'll try our best to find it."
      />
    )

    const errorData = notFoundError || timeoutError || connectionError

    return <React.Fragment>{errorData}</React.Fragment>
  }
}
