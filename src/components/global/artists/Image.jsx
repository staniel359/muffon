import React from 'react'
import { Image, Placeholder } from 'semantic-ui-react'
import axios from 'axios'
import Dimmable from './image/Dimmable'
import getData from './image/functions/getData'

export default class ArtistImage extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }

    this.getData = getData.bind(this)
  }

  componentDidMount () {
    this.request = axios.CancelToken.source()

    this.getData()
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  componentDidUpdate (prevProps, prevState) {
    const { artistName } = this.props

    const isArtistNameChanged = artistName !== prevProps.artistName

    isArtistNameChanged && this.getData()
  }

  placeholderImageData () {
    const { circular } = this.props

    const dataClassName = circular ? 'circular' : 'rounded'

    return (
      <Placeholder
        className={dataClassName}
        content={<Placeholder.Image square />}
      />
    )
  }

  dimmableImageData () {
    const { images } = this.state
    const { artistName } = this.props

    const dimmableImageProps = { images, artistName }

    return <Dimmable {...dimmableImageProps} />
  }

  basicImageData () {
    const { images } = this.state
    const { circular, size } = this.props

    return (
      <Image
        wrapped
        className="imageWrapBordered"
        src={images[0][size]}
        rounded={!circular}
        {...{ circular }}
      />
    )
  }

  artistImageData () {
    const { dimmer } = this.props

    return dimmer ? this.dimmableImageData() : this.basicImageData()
  }

  render () {
    const { isLoading, images } = this.state

    const placeholderImageData = isLoading && this.placeholderImageData()

    const artistImageData = images && this.artistImageData()

    const contentData = placeholderImageData || artistImageData

    return <React.Fragment>{contentData}</React.Fragment>
  }
}
