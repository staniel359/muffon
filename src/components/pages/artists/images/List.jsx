import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import PictureDimmer from 'global/artists/PictureDimmer'

export default class List extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isDimmerActive: false, imageIndex: 0 }
  }

  render () {
    const { itemsPerRow, images } = this.props
    const { isDimmerActive, imageIndex } = this.state

    const imageData = (image, imageIndex) => {
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
    const imagesData = images.map(imageData)

    const hideDimmer = () => this.setState({ isDimmerActive: false })
    const dimmerProps = { images, isDimmerActive, imageIndex, hideDimmer }

    return (
      <React.Fragment>
        <Card.Group {...{ itemsPerRow }}>{imagesData}</Card.Group>

        <PictureDimmer {...dimmerProps} />
      </React.Fragment>
    )
  }
}
