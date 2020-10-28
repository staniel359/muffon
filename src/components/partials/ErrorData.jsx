import React from 'react'
import { Message } from 'semantic-ui-react'

export default class ErrorData extends React.Component {
  errorCode () {
    return this.props.error.response && this.props.error.response.status
  }

  notFoundError () {
    return (
      <Message
        icon="search"
        header="Nothing was found"
        content="Try searching something else."
      />
    )
  }

  timeoutError () {
    return (
      <Message
        icon="clock outline"
        header="Gateway timeout"
        content="Please try again in a moment."
      />
    )
  }

  serverError () {
    return (
      <Message
        icon="exclamation triangle"
        header="Something went wrong"
        content="Please try again in a moment."
        warning
      />
    )
  }

  errorData () {
    if (this.errorCode() === 404) {
      return this.notFoundError()
    } else if (this.errorCode() === 504) {
      return this.timeoutError()
    } else {
      return this.serverError()
    }
  }

  render () {
    return this.errorData()
  }
}
