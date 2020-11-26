import React from 'react'
import { Popup, Button } from 'semantic-ui-react'
export default class ChangeTrack extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false, error: false }
  }

  render () {
    const { currentTrackData, getTrackData } = this.props
    const { loading, error } = this.state

    const handleClick = () => {
      const switchLoader = bool => this.setState({ loading: !!bool })

      switchLoader(true)

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

    const icon = error ? 'times' : 'angle double right'
    const disabled = loading || error
    const basic = !disabled
    const changeTrackButtonData = (
      <Button
        compact
        onClick={handleClick}
        {...{ loading, disabled, basic, icon }}
      />
    )

    return (
      <Popup
        inverted
        positionFixed
        on="hover"
        position="top center"
        content="Wrong track? Next"
        className="playerPanelExtraPopup"
        trigger={changeTrackButtonData}
      />
    )
  }
}
