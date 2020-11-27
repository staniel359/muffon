import React from 'react'
import { Popup, Button } from 'semantic-ui-react'
import axios from 'axios'

export default class ChangeTrack extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false, error: false }
  }

  componentDidMount () {
    this._isMounted = true
  }

  componentWillUnmount () {
    this._isMounted = false
    this.props.cancelTrackRequest()
  }

  getData = () => {
    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
    }

    switchLoader(true)

    const { currentTrackData, getTrackData } = this.props
    const { artistName, trackTitle, albumTitle } = currentTrackData
    const index = currentTrackData.index + 1
    const changeTrackParams = {
      ...{ artistName, trackTitle, albumTitle, index }
    }

    const handleSuccess = () => this.setState({ error: false })

    const handleError = error => {
      !axios.isCancel(error) && this.setState({ error: true })
    }

    getTrackData(changeTrackParams)
      .then(handleSuccess)
      .catch(handleError)
      .then(() => switchLoader(false))
  }

  render () {
    const { loading, error } = this.state

    const disabled = loading || error
    const basic = !disabled
    const icon = error ? 'times' : 'angle double right'
    const buttonProps = { loading, disabled, basic, icon }

    const changeTrackButtonData = (
      <Button compact onClick={this.getData} {...buttonProps} />
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
