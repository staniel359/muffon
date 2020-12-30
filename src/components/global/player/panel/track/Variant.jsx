import React from 'react'
import { List } from 'semantic-ui-react'
import axios from 'axios'
import formatSeconds from 'global/functions/formatSeconds'

export default class Variant extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }
  }

  render () {
    const { isLoading } = this.state
    const { variant, index, getVkTrackVariant, currentTrackIndex } = this.props

    const handleClick = () => {
      this.setState({ isLoading: true })

      const handleSuccess = () => this.setState({ isLoading: false })

      const handleError = error => {
        !axios.isCancel(error) && this.setState({ isError: true })
      }

      getVkTrackVariant(index).then(handleSuccess).catch(handleError)
    }

    const isActive = index === currentTrackIndex

    const contentData = (
      <List.Content className="playerPanelTrackVariantContent">
        <div>
          <List.Header content={variant.title} />
          <List.Description content={variant.artist} />
        </div>
        <div className="playerPanelTrackVariantLength">
          {formatSeconds(variant.length)}
        </div>
      </List.Content>
    )

    return (
      <List.Item
        className="playerPanelTrackVariant"
        onClick={handleClick}
        active={isActive}
        content={contentData}
        disabled={isLoading}
      />
    )
  }
}
