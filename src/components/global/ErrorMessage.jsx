import React from 'react'
import { Message, Icon, Button } from 'semantic-ui-react'

export default class ErrorMessage extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { errorData: {}, isRefreshable: false }
  }

  componentDidMount = () => this.setErrorData()

  setErrorData () {
    const { error } = this.props
    const { errors } = this

    if (error.isAxiosError) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            return this.setState({ errorData: errors.badRequest })
          case 404:
            return this.setState({ errorData: errors.notFound })
          case 500:
            return this.setState({ errorData: errors.internalServer })
          case 502:
            return this.setState({
              errorData: errors.badGateway,
              isRefreshable: true
            })
          case 504:
            return this.setState({
              errorData: errors.gatewayTimeout,
              isRefreshable: true
            })
        }
      } else {
        return this.setState({
          errorData: errors.connection,
          isRefreshable: true
        })
      }
    } else {
      this.setState({ errorData: errors.client })
      return console.log(error)
    }
  }

  errors = {
    badRequest: {
      icon: 'ban',
      header: 'Bad request',
      content: 'Please make a request with valid data.'
    },
    notFound: {
      icon: 'search',
      header: 'Nothing was found',
      content: 'Please try looking for something else.'
    },
    internalServer: {
      icon: 'server',
      header: 'Internal server error',
      content: 'Please contact us for information.'
    },
    badGateway: {
      icon: 'server',
      header: 'Remote server error',
      content: 'Please try again in a moment.'
    },
    gatewayTimeout: {
      icon: 'clock outline',
      header: 'Remote server timeout',
      content: 'Please try again in a moment.'
    },
    connection: {
      icon: 'wifi',
      header: 'Connection lost',
      content: 'Please try again in a moment.'
    },
    client: {
      icon: 'window maximize outline',
      header: 'Client error',
      content: 'Please contact us for information.'
    }
  }

  render () {
    const { handleRefresh } = this.props
    const { errorData, isRefreshable } = this.state
    const { icon, header, content } = errorData

    const textData = (
      <div>
        <Message.Header content={header} />
        {content}
      </div>
    )

    const refreshButtonData = isRefreshable && (
      <Button
        icon="refresh"
        content="Refresh"
        onClick={() => handleRefresh()}
      />
    )

    const contentData = (
      <React.Fragment>
        {textData}
        {refreshButtonData}
      </React.Fragment>
    )

    return (
      <div className="errorMessage">
        <Message icon>
          <Icon name={icon} />
          <Message.Content content={contentData} />
        </Message>
      </div>
    )
  }
}
