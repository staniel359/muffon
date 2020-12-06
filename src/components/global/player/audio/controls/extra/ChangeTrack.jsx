import React from 'react'
import { Popup, Button } from 'semantic-ui-react'
import axios from 'axios'

export default class ChangeTrack extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false, isError: false }
  }

  componentDidMount = () => (this._isMounted = true)

  componentWillUnmount () {
    this._isMounted = false
    this.props.cancelTrackRequest()
  }

  getData = () => {
    const switchLoader = isLoading => {
      this._isMounted && this.setState({ ...{ isLoading } })
    }

    switchLoader(true)

    const { currentTrackData, getTrackData } = this.props
    const { artistName, trackTitle, albumTitle } = currentTrackData
    const index = currentTrackData.index + 1
    const changeTrackParams = {
      ...{ artistName, trackTitle, albumTitle, index }
    }

    const handleSuccess = () => this.setState({ isError: false })

    const handleError = error => {
      !axios.isCancel(error) && this.setState({ isError: true })
    }

    const handleFinish = () => switchLoader(false)

    getTrackData(changeTrackParams)
      .then(handleSuccess)
      .catch(handleError)
      .then(handleFinish)
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
