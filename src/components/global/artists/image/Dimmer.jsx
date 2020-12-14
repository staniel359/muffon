import React from 'react'
import { Image, Dimmer, Container } from 'semantic-ui-react'
import Slider from 'react-slick'
import { v4 as uuid } from 'uuid'

export default class ImageDimmer extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  mainImageData () {
    const { imagesSlider } = this.state
    const { imageIndex, images } = this.props

    const setMainImageSlider = mainImageSlider =>
      this.setState({ mainImageSlider })
    const mainImageSliderProps = {
      asNavFor: imagesSlider,
      draggable: false,
      initialSlide: imageIndex,
      lazyLoad: 'ondemand',
      ref: setMainImageSlider
    }

    const imageData = image => (
      <Image
        wrapped
        className="artistImageDimmerImageWrap"
        key={uuid()}
        src={image.original}
      />
    )
    const imagesDara = images.map(imageData)

    return (
      <Container className="artistImageDimmerImageContainer">
        <Slider {...mainImageSliderProps}>{imagesDara}</Slider>
      </Container>
    )
  }

  imagesData () {
    const { mainImageSlider } = this.state
    const { images, imageIndex } = this.props

    const imagesToShow = 7
    const isInfinite = images.length > imagesToShow
    const setImagesSlider = imagesSlider => this.setState({ imagesSlider })
    const imagesSliderProps = {
      arrows: false,
      asNavFor: mainImageSlider,
      draggable: false,
      infinite: isInfinite,
      initialSlide: imageIndex,
      focusOnSelect: true,
      lazyLoad: 'ondemand',
      ref: setImagesSlider,
      slidesToShow: imagesToShow
    }

    const imageData = image => <Image key={uuid()} src={image.small} />
    const imagesData = images.map(imageData)

    return (
      <Container className="artistImageDimmerImagesContainer">
        <Slider {...imagesSliderProps}>{imagesData}</Slider>
      </Container>
    )
  }

  render () {
    const { isDimmerActive, hideDimmer } = this.props

    const contentData = (
      <React.Fragment>
        {this.mainImageData()}
        {this.imagesData()}
      </React.Fragment>
    )

    return (
      <Dimmer
        page
        className="artistImageDimmer"
        active={isDimmerActive}
        onClickOutside={hideDimmer}
        content={contentData}
      />
    )
  }
}
