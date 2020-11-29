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
    this._isMounted = true
    this.request = axios.CancelToken.source()

    this.getData()
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  componentDidUpdate (prevProps, prevState) {
    const artistNameChanged = this.props.artistName !== prevProps.artistName

    artistNameChanged && this.getData()
  }

  getData () {
    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
    }

    switchLoader(true)

    const artistNameEncoded = encodeURIComponent(this.props.artistName)
    const url = `/lastfm/artists/${artistNameEncoded}/images`
    const cancelToken = this.request.token
    const extra = { ...{ cancelToken } }

    const handleSuccess = resp => {
      const imagesList = resp.data.artist.images
      const firstImage = imagesList.slice(0, 1)
      const images = this.props.dimmer ? imagesList : firstImage

      this.setState({ ...{ images } })
    }

    const handleError = error => {
      !axios.isCancel(error) && this.setState({ images: [] })
    }

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(() => switchLoader(false))
  }

  dimmableImageData () {
    const { images, dimmerActive, imageIndex } = this.state

    const setImageIndex = index => this.setState({ imageIndex: index })
    const sliderProps = {
      accessibility: false,
      afterChange: setImageIndex,
      draggable: false,
      infinite: false,
      lazyLoad: 'ondemand'
    }

    const showDimmer = () => this.setState({ dimmerActive: true })
    const artistImageDimmable = image => {
      const key = uuid()
      const src = image.medium
      const style = { cursor: 'pointer' }

      return (
        <Image
          rounded
          wrapped
          className="imageWrap"
          onClick={showDimmer}
          {...{ key, src, style }}
        />
      )
    }
    const imagesListData = images.map(artistImageDimmable)

    const hideDimmer = () => this.setState({ dimmerActive: false })
    const dimmerProps = { images, dimmerActive, imageIndex, hideDimmer }

    return (
      <React.Fragment>
        <Slider {...sliderProps}>{imagesListData}</Slider>

        <PictureDimmer {...dimmerProps} />
      </React.Fragment>
    )
  }

  artistImageBasic () {
    const src = this.state.images[0][this.props.size]

    return <Image rounded wrapped className="imageWrapBordered" {...{ src }} />
  }

  artistImageData () {
    return this.props.dimmer
      ? this.dimmableImageData()
      : this.artistImageBasic()
  }

  defaultImage () {
    const src =
      'https://lastfm.freetls.fastly.net/i/u/600x600/' +
      '2a96cbd8b46e442fc41c2b86b821562f.png'

    return <Image rounded wrapped className="imageWrap" {...{ src }} />
  }

  render () {
    const { loading, images } = this.state

    const placeholderImageData = loading && (
      <Placeholder className="rounded" content={<Placeholder.Image square />} />
    )

    const anyImages = images.length > 0
    const imageData = anyImages ? this.artistImageData() : this.defaultImage()

    const content = placeholderImageData || imageData

    return <React.Fragment>{content}</React.Fragment>
  }
}
