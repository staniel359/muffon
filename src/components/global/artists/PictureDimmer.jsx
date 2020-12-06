import React from 'react'
import { Image, Dimmer, Container } from 'semantic-ui-react'
import Slider from 'react-slick'
import { v4 as uuid } from 'uuid'
import 'styles/global/artists/PictureDimmer.sass'

export default class PictureDimmer extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { images, imageIndex, isDimmerActive, hideDimmer } = this.props
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
    const imagesToShow = 7
    const imagesSliderProps = {
      arrows: false,
      asNavFor: mainImageSlider,
      draggable: false,
      infinite: images.length > imagesToShow,
      initialSlide: imageIndex,
      focusOnSelect: true,
      lazyLoad: 'ondemand',
      ref: setImagesSlider,
      slidesToShow: imagesToShow
    }

    const imageSmall = image => <Image key={uuid()} src={image.small} />
    const imagesList = images.map(imageSmall)

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
        active={isDimmerActive}
        onClickOutside={hideDimmer}
        content={dimmerData}
      />
    )
  }
}
