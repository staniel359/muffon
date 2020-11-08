import React from 'react'
import { Image, Placeholder } from 'semantic-ui-react'
import axios from 'axios'
import Slider from 'react-slick'
import { v4 as uuid } from 'uuid'
import PictureDimmer from './PictureDimmer'

export default class Picture extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      imageIndex: 0,
      images: []
    }
  }

  componentDidMount () {
    this.getImages()
  }

  componentDidUpdate (prevProps, prevState) {
    const artistNameChanged = this.props.artistName !== prevProps.artistName

    artistNameChanged && this.getImages()
  }

  getImages () {
    this.setState({ loading: true, images: [] })

    const artistName = encodeURIComponent(this.props.artistName)
    const url = `/lastfm/artists/${artistName}/images`
    const link = { method: 'GET', url: url }

    axios(link).then(this.setImagesData).catch(this.handleError)
  }

  setImagesData = resp => {
    const imagesData = resp.data.artist.images
    const images = this.props.dimmer ? imagesData : imagesData.slice(0, 1)

    this.setState({ loading: false, images: images })
  }

  handleError = () => {
    this.setState({ loading: false, images: [] })
  }

  placeholderImage () {
    return (
      <Placeholder className="rounded" content={<Placeholder.Image square />} />
    )
  }

  imagesData () {
    const anyImages = this.state.images.length > 0

    return anyImages ? this.imageData() : this.defaultImage()
  }

  imageData () {
    return this.props.dimmer
      ? this.dimmableImageData()
      : this.artistImageBasic()
  }

  dimmableImageData () {
    return (
      <React.Fragment>
        {this.sliderData()}

        {this.dimmerData()}
      </React.Fragment>
    )
  }

  sliderData () {
    return (
      <Slider
        accessibility={false}
        afterChange={this.setImageIndex}
        draggable={false}
        infinite={false}
        lazyLoad="ondemand"
      >
        {this.state.images.map(this.artistImageDimmable)}
      </Slider>
    )
  }

  setImageIndex = index => {
    this.setState({ imageIndex: index })
  }

  artistImageDimmable = image => {
    return (
      <Image
        rounded
        wrapped
        className="imageWrap"
        key={uuid()}
        src={image.large}
        style={{ cursor: 'pointer' }}
        onClick={this.showDimmer}
      />
    )
  }

  artistImageBasic () {
    const src = this.state.images[0].medium

    return <Image rounded wrapped className="imageWrapBordered" src={src} />
  }

  showDimmer = () => {
    this.setState({ dimmer: true })
  }

  dimmerData () {
    const { dimmer, imageIndex, images } = this.state
    const { hideDimmer } = this
    const props = { dimmer, imageIndex, images, hideDimmer }

    return <PictureDimmer {...props} />
  }

  hideDimmer = () => {
    this.setState({ dimmer: false })
  }

  defaultImage () {
    const src =
      'https://lastfm.freetls.fastly.net/i/u/600x600/2a96cbd8b46e442fc41c2b86b821562f.png'

    return <Image rounded wrapped className="imageWrap" src={src} />
  }

  render () {
    return this.state.loading ? this.placeholderImage() : this.imagesData()
  }
}
