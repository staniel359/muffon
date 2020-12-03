import React from 'react'
import { Message } from 'semantic-ui-react'

export default class ErrorMessage extends React.PureComponent {
  render () {
    const { error } = this.props

    const errors = {
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

    const errorData = () => {
      if (error.isAxiosError) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              return errors.badRequest
            case 404:
              return errors.notFound
            case 500:
              return errors.internalServer
            case 502:
              return errors.badGateway
            case 504:
              return errors.gatewayTimeout
          }
        } else {
          return errors.connection
        }
      } else {
        return errors.client
      }
    }

    return (
      <div className="errorMessage">
        <Message {...errorData()} />
      </div>
    )
  }
}
