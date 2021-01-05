import React from 'react'
import { Button } from 'semantic-ui-react'
import getData from './functions/getData'

export default class BackwardButton extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }

    this.getData = getData.bind(this)
  }

  render () {
    const { isLoading } = this.state
    const { currentAlbum, currentAlbumTrackIndex } = this.props

    const isFirstTrack = () => {
      if (currentAlbum) {
        return currentAlbumTrackIndex === 0
      } else {
        return false
      }
    }
    const isDisabled = isFirstTrack() || isLoading

    const handleClick = () => this.getData('backward')

    return (
      <Button
        basic
        compact
        icon="backward"
        disabled={isDisabled}
        loading={isLoading}
        onClick={handleClick}
      />
    )
  }
}
