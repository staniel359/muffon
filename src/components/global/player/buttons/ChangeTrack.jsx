import React from 'react'
import { Button } from 'semantic-ui-react'

export default class ChangeTrack extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false }
  }

  changeTrack = () => {
    const switchLoader = bool => this.setState({ loading: !!bool })

    switchLoader(true)

    const { currentTrackData, getTrackData } = this.props
    const { artistName, trackTitle, albumTitle } = currentTrackData
    const index = currentTrackData.index + 1
    const changeTrackParams = { artistName, trackTitle, albumTitle, index }

    const handleSuccess = () => this.setState({ error: false })
    const handleError = () => this.setState({ error: true })

    getTrackData({ ...changeTrackParams })
      .then(handleSuccess)
      .catch(handleError)
      .then(switchLoader)
  }

  render () {
    const { currentTrackData, getTrackData, children, ...rest } = this.props
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
