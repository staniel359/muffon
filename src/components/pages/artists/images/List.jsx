import React from 'react'
import { v4 as uuid } from 'uuid'
import { Card, Image } from 'semantic-ui-react'
import Dimmer from 'global/artists/image/Dimmer'

export default class List extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isDimmerActive: false, imageIndex: 0 }
  }

  contentData () {
    const { itemsPerRow, images } = this.props

    const imagesData = images.map(this.imageData)

    return <Card.Group {...{ itemsPerRow }}>{imagesData}</Card.Group>
  }

  imageData = (image, imageIndex) => {
    const handleClick = () => {
      this.setState({ isDimmerActive: true, imageIndex })
    }

    return (
      <Card as="a" className="cardLight" key={uuid()}>
        <Image
          wrapped
          rounded
          className="imageWrapBordered clickable"
          src={image.small}
          onClick={handleClick}
        />
      </Card>
    )
  }

  dimmerData () {
    const { isDimmerActive, imageIndex } = this.state
    const { images } = this.props

    const hideDimmer = () => this.setState({ isDimmerActive: false })

    const dimmerProps = { isDimmerActive, imageIndex, images, hideDimmer }

    return <Dimmer {...dimmerProps} />
  }

  render () {
    return (
      <React.Fragment>
        {this.contentData()}
        {this.dimmerData()}
      </React.Fragment>
    )
  }
}
