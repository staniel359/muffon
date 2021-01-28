import React from 'react'
import { Message, Icon, Button } from 'semantic-ui-react'
import errorsList from './error_message/functions/errorsList'

export default class ErrorMessage extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { errorData: {} }
  }

  componentDidMount () {
    this.handleError()
  }

  handleError () {
    const { isAxiosError } = this.props.error

    if (isAxiosError) {
      this.handleAxiosError()
    } else {
      this.setErrorData('client')
    }
  }

  handleAxiosError () {
    const { response } = this.props.error

    if (response) {
      this.handleResponseError()
    } else {
      return this.setErrorData('connection')
    }
  }

  handleResponseError () {
    const { status } = this.props.error.response

    switch (status) {
      case 400:
        return this.setErrorData('badRequest')
      case 404:
        return this.setErrorData('notFound')
      case 500:
        return this.setErrorData('internalServer')
      case 502:
        return this.setErrorData('badGateway')
      case 504:
        return this.setErrorData('gatewayTimeout')
    }
  }

  setErrorData (error, isRefreshable) {
    const errorData = errorsList()[error]

    this.setState({ errorData, isRefreshable })
  }

  contentData () {
    const { icon } = this.state.errorData

    return (
      <Message icon>
        <Icon name={icon} />
        <Message.Content content={this.messageData()} />
      </Message>
    )
  }

  messageData () {
    const { isRefreshable } = this.state.errorData

    const refreshButtonData = isRefreshable && this.refreshButtonData()

    return (
      <React.Fragment>
        {this.textData()}
        {refreshButtonData}
      </React.Fragment>
    )
  }

  textData () {
    const { header, content } = this.state.errorData

    return (
      <div>
        <Message.Header content={header} />
        {content}
      </div>
    )
  }

  refreshButtonData () {
    const { handleRefresh } = this.props

    return <Button icon="refresh" content="Refresh" onClick={handleRefresh} />
  }

  render () {
    return <div className="errorMessage">{this.contentData()}</div>
  }
}
