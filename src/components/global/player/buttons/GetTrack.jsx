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
    const switchLoader = bool => this.setState({ loading: !!bool })

    switchLoader(true)

    const { artistName, trackTitle, trackId } = this.props

    const handleSuccess = () => this.context.setCurrentTrackId(trackId)
    const handleError = () => this.setState({ error: true })

    this.context
      .getTrack(artistName, trackTitle)
      .then(handleSuccess)
      .catch(handleError)
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
