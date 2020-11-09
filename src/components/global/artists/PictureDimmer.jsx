import React from 'react'
import { Image, Dimmer, Container } from 'semantic-ui-react'
import Slider from 'react-slick'
import { v4 as uuid } from 'uuid'

export default class PictureDimmer extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  setMainImageSlider = slider => {
    this.setState({ mainImageSlider: slider })
  }

  imageOriginal = image => {
    return (
      <Image
        wrapped
        className="artistPictureDimmerImageWrap"
        key={uuid()}
        src={image.original}
      />
    )
  }

  setImagesSlider = slider => {
    this.setState({ imagesSlider: slider })
  }

  imageMedium = image => {
    return <Image key={uuid()} src={image.medium} />
  }

  render () {
    const { images, imageIndex, dimmerActive, hideDimmer } = this.props
    const { mainImageSlider, imagesSlider } = this.state

    const mainImageSliderSettings = {
      asNavFor: imagesSlider,
      draggable: false,
      initialSlide: imageIndex,
      lazyLoad: 'ondemand',
      ref: this.setMainImageSlider
    }
    const mainImageImagesList = images.map(this.imageOriginal)
    const mainImageData = (
      <Container className="artistPictureDimmerImageContainer">
        <Slider {...mainImageSliderSettings}>{mainImageImagesList}</Slider>
      </Container>
    )

    const imagesSliderSettings = {
      arrows: false,
      asNavFor: mainImageSlider,
      draggable: false,
      infinite: false,
      initialSlide: imageIndex,
      focusOnSelect: true,
      lazyLoad: 'ondemand',
      ref: this.setImagesSlider,
      slidesToShow: 7
    }
    const imagesList = images.map(this.imageMedium)
    const imagesData = (
      <Container className="artistPictureDimmerImagesContainer">
        <Slider {...imagesSliderSettings}>{imagesList}</Slider>
      </Container>
    )

    const dimmerData = (
      <React.Fragment>
        {mainImageData}
        {imagesData}
      </React.Fragment>
    )

    return (
      <Dimmer
        page
        className="artistPictureDimmer"
        active={dimmerActive}
        onClickOutside={hideDimmer}
        content={dimmerData}
      />
    )
  }
}
