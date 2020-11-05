import React from 'react'
import { Button } from 'semantic-ui-react'
import PlayerContext from 'contexts/PlayerContext'

export default class GetTrack extends React.Component {
  static contextType = PlayerContext

  constructor (props) {
    super(props)
    this.state = { loading: false, error: false }
  }

  getTrack = () => {
    this.startLoader()
    this.getTrackPromise().then(this.props.audioPresent).catch(this.handleError)
  }

  startLoader () {
    this.setState({ loading: true })
  }

  getTrackPromise () {
    const { artistName, trackTitle } = this.props

    return this.context.getTrack(artistName, trackTitle)
  }

  handleError = () => {
    this.setState({ error: true, loading: false })
  }

  isDisabled () {
    return this.state.loading || this.state.error
  }

  getTrackButtonIcon () {
    return this.state.error ? 'times' : 'play'
  }

  render () {
    return (
      <Button
        onClick={this.getTrack}
        loading={this.state.loading}
        disabled={this.isDisabled()}
        icon={this.getTrackButtonIcon()}
      />
    )
  }
}
