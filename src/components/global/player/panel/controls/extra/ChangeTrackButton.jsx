import React from 'react'
import { Popup, Button } from 'semantic-ui-react'
import axios from 'axios'

export default class ChangeTrackButton extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false, isError: false }
  }

  componentWillUnmount () {
    this.props.cancelTrackRequest()
  }

  getData = () => {
    this.setState({ isLoading: true })

    const { currentTrackData, getTrackData } = this.props
    const { artistName, trackTitle, albumTitle } = currentTrackData
    const index = currentTrackData.index + 1
    const changeTrackParams = {
      ...{ artistName, trackTitle, albumTitle, index }
    }

    const handleSuccess = () => {
      const successState = { isError: false, isLoading: false }

      this.setState(successState)
    }

    const handleError = error => {
      const errorState = { isError: true, isLoading: false }

      !axios.isCancel(error) && this.setState(errorState)
    }

    getTrackData(changeTrackParams).then(handleSuccess).catch(handleError)
  }

  render () {
    const { isLoading, isError } = this.state

    const isDisabled = isLoading || isError
    const icon = isError ? 'times' : 'angle double right'

    const changeTrackButtonData = (
      <Button
        compact
        onClick={this.getData}
        loading={isLoading}
        disabled={isDisabled}
        basic={!isDisabled}
        {...{ icon }}
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
