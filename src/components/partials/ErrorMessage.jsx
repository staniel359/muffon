import React from 'react'
import { Message } from 'semantic-ui-react'

export default class ErrorMessage extends React.PureComponent {
  render () {
    const { error } = this.props

    const errors = {
      notFound: {
        icon: 'search',
        header: 'Nothing was found',
        content: 'Please try looking for something else.'
      },
      remoteServer: {
        icon: 'server',
        header: 'Remote server unavailable',
        content: 'Please try again in a moment.'
      },
      timeout: {
        icon: 'clock outline',
        header: 'Gateway timeout',
        content: 'Please try again in a moment.'
      },
      internalServer: {
        icon: 'server',
        header: 'Internal server error',
        content: 'Please contact us for information.'
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
            case 404:
              return errors.notFound
            case 503:
              return errors.remoteServer
            case 504:
              return errors.timeout
            default:
              return errors.internalServer
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
