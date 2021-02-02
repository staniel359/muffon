import React from 'react'
import { List } from 'semantic-ui-react'
import Button from './track/Button'
import Data from './track/Data'
import getData from './functions/getData'

export default class Track extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isHovered: false, isLoading: false, isError: false }

    this.getData = getData.bind(this)
  }

  componentDidMount = () => (this._isMounted = true)

  componentWillUnmount = () => (this._isMounted = false)

  buttonData () {
    const { isError, isLoading, isHovered } = this.state
    const { audioStatus, isPlaying } = this.props

    const buttonProps = {
      isLoading,
      isError,
      isPlaying,
      audioStatus,
      isHovered
    }

    return <Button {...buttonProps} />
  }

  trackData () {
    const { index, track, isWithArtist, isWithAlbum, isWithAlbumImage, hideSearch, topTrackCount } = this.props

    const dataProps = { index, track, isWithArtist, isWithAlbum, isWithAlbumImage, hideSearch, topTrackCount }

    return <Data {...dataProps} />
  }

  render () {
    const { isLoading } = this.state
    const { isPlaying, toggleAudio } = this.props

    const handleTrackClick = () => {
      if (!isLoading) {
        isPlaying ? toggleAudio() : this.getData()
      }
    }

    const contentData = (
      <React.Fragment>
        {this.buttonData()}
        {this.trackData()}
      </React.Fragment>
    )

    const handleMouseEnter = () => this.setState({ isHovered: true })
    const handleMouseLeave = () => this.setState({ isHovered: false })

    return (
      <List.Item
        className="track"
        onClick={handleTrackClick}
        active={isPlaying}
        content={contentData}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    )
  }
}
