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

    const remoteError = errorCode === 503 && (
      <Message
        icon="exclamation circle"
        header="Remote server error"
        content="Please try again in a moment."
      />
    )

    const connectionError = (
      <Message
        icon="exclamation triangle"
        header="Connection lost"
        content="We are working on it."
      />
    )

    const errorData =
      notFoundError || timeoutError || remoteError || connectionError

    return <div className="errorMessage">{errorData}</div>
  }
}
