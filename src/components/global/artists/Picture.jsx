import React from 'react'
import { Image, Placeholder } from 'semantic-ui-react'
import axios from 'axios'
import Slider from 'react-slick'
import { v4 as uuid } from 'uuid'
import PictureDimmer from './PictureDimmer'

export default class Picture extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false, imageIndex: 0 }
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
    const { artistName } = this.props

    const isArtistNameChanged = artistName !== prevProps.artistName

    isArtistNameChanged && this.getData()
  }

  getData () {
    const switchLoader = isLoading => {
      this._isMounted && this.setState({ ...{ isLoading } })
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
      const images = null

      !axios.isCancel(error) && this.setState({ ...{ error, images } })
    }

    const handleFinish = () => switchLoader(false)

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(handleFinish)
  }

  dimmableImageData () {
    const { images, isDimmerActive, imageIndex } = this.state

    const setImageIndex = index => this.setState({ imageIndex: index })
    const sliderProps = {
      accessibility: false,
      afterChange: setImageIndex,
      draggable: false,
      infinite: false,
      lazyLoad: 'ondemand'
    }

    const showDimmer = () => this.setState({ isDimmerActive: true })
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

    const hideDimmer = () => this.setState({ isDimmerActive: false })
    const dimmerProps = { images, isDimmerActive, imageIndex, hideDimmer }

    return (
      <React.Fragment>
        <Slider {...sliderProps}>{imagesListData}</Slider>

        <PictureDimmer {...dimmerProps} />
      </React.Fragment>
    )
  }

  artistImageBasic () {
    const { circular, size } = this.props
    const { images } = this.state

    const src = images[0][size]
    const rounded = !circular

    return (
      <Image
        wrapped
        className="imageWrapBordered"
        {...{ src, rounded, circular }}
      />
    )
  }

  artistImageData () {
    return this.props.dimmer
      ? this.dimmableImageData()
      : this.artistImageBasic()
  }

  render () {
    const { isLoading, images } = this.state
    const { circular } = this.props

    const placeholderClassName = circular ? 'circular' : 'rounded'
    const placeholderImageData = isLoading && (
      <Placeholder
        className={placeholderClassName}
        content={<Placeholder.Image square />}
      />
    )

    const artistImageData = images && this.artistImageData()

    const contentData = placeholderImageData || artistImageData

    return <React.Fragment>{contentData}</React.Fragment>
  }
}
