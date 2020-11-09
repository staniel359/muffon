import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import { Button } from 'semantic-ui-react'

export default class ChangeTrack extends React.PureComponent {
  static contextType = PlayerContext

  constructor (props) {
    super(props)
    this.state = { loading: false }
  }

  changeTrack = () => {
    this.switchLoader(true)

    const { artist, title, index } = this.context.currentTrackData

    this.context
      .getTrack(artist, title, index + 1)
      .then(this.handleSuccess)
      .catch(this.handleError)
      .then(this.switchLoader)
  }

  switchLoader = bool => {
    this.setState({ loading: !!bool })
  }

  handleSuccess = () => {
    this.setState({ error: false })
  }

  handleError = () => {
    this.setState({ error: true })
  }

  render () {
    const { children, ...rest } = this.props
    const { loading, error } = this.state

    const icon = error ? 'times' : 'angle double right'

    return (
      <Button
        {...rest}
        compact
        onClick={this.changeTrack}
        loading={loading}
        disabled={loading || error}
        basic={!(loading || error)}
        icon={icon}
      />
    )
  }
}
