import React from 'react'
import { v4 as uuid } from 'uuid'
import { Image, Segment, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import Dimmer from './Dimmer'

export default class Dimmable extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isDimmerActive: false, imageIndex: 0 }
  }

  sliderData () {
    const { images } = this.props

    const setImageIndex = imageIndex => this.setState({ imageIndex })
    const sliderProps = {
      accessibility: false,
      afterChange: setImageIndex,
      draggable: false,
      infinite: false,
      lazyLoad: 'ondemand'
    }

    const showDimmer = () => this.setState({ isDimmerActive: true })
    const imageData = image => (
      <Image
        rounded
        wrapped
        className="imageWrap clickable"
        key={uuid()}
        src={image.medium}
        onClick={showDimmer}
      />
    )
    const imagesListData = images.map(imageData)

    return <Slider {...sliderProps}>{imagesListData}</Slider>
  }

  viewMoreData () {
    const { artistName } = this.props

    const artistNameEncoded = encodeURIComponent(artistName)
    const imagesPageLink = `/artists/${artistNameEncoded}/images`

    return (
      <Label
        basic
        circular
        className="artistPageImagesLink"
        size="large"
        attached="bottom right"
        icon="ellipsis horizontal"
        as={Link}
        to={imagesPageLink}
      />
    )
  }

  dimmerData () {
    const { images } = this.props
    const { isDimmerActive, imageIndex } = this.state

    const hideDimmer = () => this.setState({ isDimmerActive: false })
    const dimmerProps = { images, isDimmerActive, imageIndex, hideDimmer }

    return <Dimmer {...dimmerProps} />
  }

  render () {
    return (
      <React.Fragment>
        <Segment className="artistPageArtistImage">
          {this.sliderData()}
          {this.viewMoreData()}
        </Segment>

        {this.dimmerData()}
      </React.Fragment>
    )
  }
}
