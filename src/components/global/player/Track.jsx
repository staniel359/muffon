import React from 'react'
import { List } from 'semantic-ui-react'
import Button from './track/Button'
import Data from './track/Data'
import getData from './functions/getData'

export default class Track extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false, isError: false }

    this.getData = getData.bind(this)
  }

  componentDidMount = () => (this._isMounted = true)

  componentWillUnmount = () => (this._isMounted = false)

  iconData () {
    const { track, albumSource } = this.props

    const iconName = track.audio.present ? albumSource : ''

    return <List.Icon className="trackSourceIcon" name={iconName} />
  }

  buttonData () {
    const { isError, isLoading } = this.state
    const { audioStatus, isPlaying } = this.props

    const buttonProps = { isError, isLoading, audioStatus, isPlaying }

    return <Button {...buttonProps} />
  }

  trackData () {
    const { index, track, isWithArtist, hideSearch, topTrackCount } = this.props

    const dataProps = { index, track, isWithArtist, hideSearch, topTrackCount }

    return <Data {...dataProps} />
  }

  render () {
    const { isLoading } = this.state
    const { isPlaying, toggleAudio, albumSource } = this.props

    const handleTrackClick = () => {
      if (!isLoading) {
        isPlaying ? toggleAudio() : this.getData()
      }
    }

    const isIconShown = albumSource && albumSource !== 'lastfm'
    const iconData = isIconShown && this.iconData()

    const contentData = (
      <React.Fragment>
        {iconData}
        {this.buttonData()}
        {this.trackData()}
      </React.Fragment>
    )

    return (
      <List.Item
        className="track"
        onClick={handleTrackClick}
        active={isPlaying}
        content={contentData}
      />
    )
  }
}
