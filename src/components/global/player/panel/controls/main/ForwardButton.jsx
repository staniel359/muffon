import React from 'react'
import { Button } from 'semantic-ui-react'
import getData from './functions/getData'

export default class ForwardButton extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }

    this.getData = getData.bind(this)
  }

  render () {
    const { isLoading } = this.state
    const { currentAlbum, currentAlbumTrackIndex } = this.props

    const isLastTrack = () => {
      if (currentAlbum) {
        return currentAlbumTrackIndex === currentAlbum.tracks.length - 1
      } else {
        return false
      }
    }

    const isDisabled = isLastTrack() || isLoading

    const handleClick = () => this.getData('forward')

    return (
      <Button
        basic
        compact
        icon="forward"
        disabled={isDisabled}
        loading={isLoading}
        onClick={handleClick}
      />
    )
  }
}
