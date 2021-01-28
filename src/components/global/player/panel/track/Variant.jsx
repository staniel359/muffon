import React from 'react'
import { List } from 'semantic-ui-react'
import axios from 'axios'
import formatSeconds from 'global/functions/formatSeconds'

export default class Variant extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }
  }

  contentData () {
    const { variant } = this.props

    const titleArtistData = (
      <div>
        <List.Header content={variant.title} />
        <List.Description content={variant.artist.name} />
      </div>
    )

    const lengthData = (
      <div className="playerPanelTrackVariantLength">
        {formatSeconds(variant.length)}
      </div>
    )

    return (
      <List.Content className="playerPanelTrackVariantContent">
        {titleArtistData}
        {lengthData}
      </List.Content>
    )
  }

  handleClick = () => {
    const { getTrackVariant, variant } = this.props

    this.setState({ isLoading: true })

    const handleSuccess = () => this.setState({ isLoading: false })

    const handleError = error => {
      !axios.isCancel(error) && this.setState({ isError: true })
    }

    getTrackVariant(variant).then(handleSuccess).catch(handleError)
  }

  render () {
    const { isLoading } = this.state
    const { variant, currentTrackAudioId } = this.props

    const isActive = variant.audio.id === currentTrackAudioId

    return (
      <List.Item
        className="playerPanelTrackVariant"
        active={isActive}
        disabled={isLoading}
        content={this.contentData()}
        onClick={this.handleClick}
      />
    )
  }
}
