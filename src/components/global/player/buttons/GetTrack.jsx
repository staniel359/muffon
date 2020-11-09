import React from 'react'
import { Button } from 'semantic-ui-react'
import PlayerContext from 'contexts/PlayerContext'

export default class GetTrack extends React.PureComponent {
  static contextType = PlayerContext

  constructor (props) {
    super(props)
    this.state = { loading: false, error: false }
  }

  getTrack = () => {
    this.switchLoader(true)

    const { artistName, trackTitle } = this.props

    this.context
      .getTrack(artistName, trackTitle)
      .then(this.handleSuccess)
      .catch(this.handleError)
  }

  switchLoader = bool => {
    this.setState({ loading: !!bool })
  }

  handleSuccess = () => {
    this.context.setCurrentTrackId(this.props.trackId)
  }

  handleError = () => {
    this.setState({ error: true })
  }

  render () {
    const { loading, error } = this.state

    const icon = error ? 'times' : 'play'

    return (
      <Button
        onClick={this.getTrack}
        loading={loading}
        disabled={loading || error}
        icon={icon}
      />
    )
  }
}
