import React from 'react'
import { Image, Dimmer, Placeholder } from 'semantic-ui-react'
import axios from 'axios'
import Slider from 'react-slick'
import { v4 as uuid } from 'uuid'

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
    this.setState({ images: [], loading: true })

    const artistName = encodeURIComponent(this.props.artistName)
    const url = `/lastfm/artists/${artistName}/images`
    const link = { method: 'GET', url: url }

    axios(link).then(resp => this.setImagesData(resp))
  }

  setImagesData (resp) {
    const imagesData = resp.data.artist.images
    const images = this.props.slider ? imagesData : imagesData.slice(0, 1)

    this.setState({ images: images, loading: false })
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
    return (
      <React.Fragment>
        {this.props.slider ? this.sliderData() : this.artistImage()}

        {this.props.dimmer && this.dimmerData()}
      </React.Fragment>
    )
  }

  sliderData () {
    return (
      <Slider {...this.sliderSettings}>
        {this.state.images.map(image => {
          return <div key={uuid()}>{this.artistImage(image)}</div>
        })}
      </Slider>
    )
  }

  sliderSettings = {
    accessibility: false,
    afterChange: index => this.setImageIndex(index),
    draggable: false,
    infinite: false,
    lazyLoad: 'ondemand'
  }

  setImageIndex = index => {
    this.setState({ imageIndex: index })
  }

  artistImage (image) {
    const className = this.props.border ? 'imageWrapBordered' : 'imageWrap'
    const src = this.imageLinks(image).medium
    const style = this.props.dimmer && { cursor: 'pointer' }
    const handler = this.props.dimmer && this.showDimmer

    return (
      <Image
        rounded
        wrapped
        className={className}
        src={src}
        style={style}
        onClick={handler}
      />
    )
  }

  imageLinks (image) {
    const { images, imageIndex } = this.state
    const imageData = image || images[imageIndex] || {}
    const defaultLink =
      'https://lastfm.freetls.fastly.net/i/u/600x600' +
      '/2a96cbd8b46e442fc41c2b86b821562f.png'

    return {
      original: imageData.original,
      medium: imageData.cropped_600,
      small: imageData.cropped_300,
      default: defaultLink
    }
  }

  showDimmer = () => {
    this.setState({ dimmer: true })
  }

  dimmerData () {
    return (
      <Dimmer
        page
        className="artistPagePictureDimmer"
        active={this.state.dimmer}
        content={this.dimmerImage()}
        onClick={this.hideDimmer}
      />
    )
  }

  dimmerImage () {
    const src = this.imageLinks().original

    return <Image rounded centered src={src} />
  }

  hideDimmer = () => {
    this.setState({ dimmer: false })
  }

  defaultImage () {
    const src = this.imageLinks().default

    return <Image rounded wrapped className="imageWrap" src={src} />
  }

  render () {
    return this.state.loading ? this.placeholderImage() : this.imagesData()
  }
}
