import React from 'react'
import { Image, Dimmer, Container } from 'semantic-ui-react'
import Slider from 'react-slick'
import { v4 as uuid } from 'uuid'

export default class PictureDimmer extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { images, imageIndex, dimmerActive, hideDimmer } = this.props
    const { mainImageSlider, imagesSlider } = this.state

    const setMainImageSlider = slider =>
      this.setState({ mainImageSlider: slider })
    const mainImageSliderProps = {
      asNavFor: imagesSlider,
      draggable: false,
      initialSlide: imageIndex,
      lazyLoad: 'ondemand',
      ref: setMainImageSlider
    }

    const imageOriginal = image => (
      <Image
        wrapped
        className="artistPictureDimmerImageWrap"
        key={uuid()}
        src={image.original}
      />
    )
    const mainImageImagesList = images.map(imageOriginal)

    const mainImageData = (
      <Container className="artistPictureDimmerImageContainer">
        <Slider {...mainImageSliderProps}>{mainImageImagesList}</Slider>
      </Container>
    )

    const setImagesSlider = slider => {
      this.setState({ imagesSlider: slider })
    }
    const imagesSliderProps = {
      arrows: false,
      asNavFor: mainImageSlider,
      draggable: false,
      initialSlide: imageIndex,
      focusOnSelect: true,
      lazyLoad: 'ondemand',
      ref: setImagesSlider,
      slidesToShow: 7
    }

    const imageMedium = image => <Image key={uuid()} src={image.medium} />
    const imagesList = images.map(imageMedium)

    const imagesData = (
      <Container className="artistPictureDimmerImagesContainer">
        <Slider {...imagesSliderProps}>{imagesList}</Slider>
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
