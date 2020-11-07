import React from 'react'
import { Image, Dimmer, Container } from 'semantic-ui-react'
import Slider from 'react-slick'
import { v4 as uuid } from 'uuid'

export default class PictureDimmer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  dimmerImageData () {
    return (
      <Container className="artistPictureDimmerImageContainer">
        <Slider
          asNavFor={this.state.imagesSlider}
          draggable={false}
          infinite={false}
          initialSlide={this.props.imageIndex}
          lazyLoad="ondemand"
          ref={this.setImageSlider}
        >
          {this.props.images.map(this.dimmerImage)}
        </Slider>
      </Container>
    )
  }

  setImageSlider = slider => {
    this.setState({ imageSlider: slider })
  }

  dimmerImage = image => {
    return (
      <Image
        wrapped
        className="artistPictureDimmerImageWrap"
        key={uuid()}
        src={image.original}
      />
    )
  }

  dimmerImagesData () {
    return (
      <Container className="artistPictureDimmerImagesContainer">
        <Slider
          arrows={false}
          asNavFor={this.state.imageSlider}
          draggable={false}
          infinite={false}
          initialSlide={this.props.imageIndex}
          focusOnSelect={true}
          lazyLoad="ondemand"
          ref={this.setImagesSlider}
          slidesToShow={7}
        >
          {this.props.images.map(this.dimmerImageMedium)}
        </Slider>
      </Container>
    )
  }

  setImagesSlider = slider => {
    this.setState({ imagesSlider: slider })
  }

  dimmerImageMedium = image => {
    return <Image key={uuid()} src={image.medium} />
  }

  render () {
    return (
      <Dimmer
        page
        className="artistPictureDimmer"
        active={this.props.dimmer}
        onClickOutside={this.props.hideDimmer}
      >
        {this.dimmerImageData()}

        {this.dimmerImagesData()}
      </Dimmer>
    )
  }
}
