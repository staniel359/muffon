import React from 'react'
import { Button } from 'semantic-ui-react'

export default class GetTrack extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false, error: false }
  }

  getTrack = () => {
    const switchLoader = bool => this.setState({ loading: !!bool })

    switchLoader(true)

    const {
      artistName,
      trackTitle,
      albumTitle,
      trackId,
      setCurrentTrackId,
      getTrackData
    } = this.props
    const getTrackParams = { artistName, trackTitle, albumTitle }

    const handleSuccess = () => setCurrentTrackId(trackId)
    const handleError = () => {
      this.setState({ error: true })

      switchLoader(false)
    }

    getTrackData({ ...getTrackParams })
      .then(handleSuccess)
      .catch(handleError)
  }

  render () {
    const { loading, error } = this.state

    const icon = error ? 'times' : 'play'

    return (
      <Button
        size="small"
        onClick={this.getTrack}
        loading={loading}
        disabled={loading || error}
        icon={icon}
      />
    )
  }
}
