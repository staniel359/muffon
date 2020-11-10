import React from 'react'
import { Image, Placeholder } from 'semantic-ui-react'
import axios from 'axios'
import Slider from 'react-slick'
import { v4 as uuid } from 'uuid'
import PictureDimmer from './PictureDimmer'

export default class Picture extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false, imageIndex: 0, images: [] }
  }

  componentDidMount () {
    this.getImages()
  }

  componentDidUpdate (prevProps, prevState) {
    const artistNameChanged = this.props.artistName !== prevProps.artistName

    artistNameChanged && this.getImages()
  }

  getImages () {
    const switchLoader = bool => this.setState({ loading: !!bool })

    switchLoader(true)

    const artistName = encodeURIComponent(this.props.artistName)
    const url = `/lastfm/artists/${artistName}/images`

    const handleSuccess = resp => {
      const imagesList = resp.data.artist.images
      const firstImage = imagesList.slice(0, 1)
      const images = this.props.dimmer ? imagesList : firstImage

      this.setState({ images: images })
    }
    const handleError = () => this.setState({ images: [] })

    axios.get(url).then(handleSuccess).catch(handleError).then(switchLoader)
  }

  render () {
    const { loading, images, dimmerActive, imageIndex } = this.state
    const { dimmer } = this.props

    const placeholderImageData = loading && (
      <Placeholder className="rounded" content={<Placeholder.Image square />} />
    )

    const anyImages = images.length > 0

    const setImageIndex = index => this.setState({ imageIndex: index })
    const sliderProps = {
      accessibility: false,
      afterChange: setImageIndex,
      draggable: false,
      infinite: false,
      lazyLoad: 'ondemand'
    }

    const showDimmer = () => this.setState({ dimmerActive: true })
    const artistImageDimmable = image => (
      <Image
        rounded
        wrapped
        className="imageWrap"
        key={uuid()}
        src={image.large}
        style={{ cursor: 'pointer' }}
        onClick={showDimmer}
      />
    )
    const imagesList = images.map(artistImageDimmable)

    const hideDimmer = () => this.setState({ dimmerActive: false })
    const dimmerProps = { dimmerActive, imageIndex, images, hideDimmer }

    const dimmableImageData = (
      <React.Fragment>
        <Slider {...sliderProps}>{imagesList}</Slider>

        <PictureDimmer {...dimmerProps} />
      </React.Fragment>
    )

    const basicImageSrc = anyImages && images[0].medium
    const artistImageBasic = (
      <Image
        rounded
        wrapped
        className="imageWrapBordered"
        src={basicImageSrc}
      />
    )

    const artistImageData = dimmer ? dimmableImageData : artistImageBasic

    const defaultImageSrc =
      'https://lastfm.freetls.fastly.net/i/u/600x600/' +
      '2a96cbd8b46e442fc41c2b86b821562f.png'
    const defaultImage = (
      <Image rounded wrapped className="imageWrap" src={defaultImageSrc} />
    )

    const imageData = anyImages ? artistImageData : defaultImage

    const pictureData = placeholderImageData || imageData

    return <React.Fragment>{pictureData}</React.Fragment>
  }
}
