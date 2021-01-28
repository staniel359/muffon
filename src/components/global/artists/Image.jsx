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

  componentDidUpdate (prevProps, prevState) {
    const { artistName } = this.props

    const isArtistNameChanged = artistName !== prevProps.artistName

    isArtistNameChanged && this.getData()
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  placeholderImageData () {
    const { circular } = this.props

    const className = circular ? 'circular' : 'rounded'

    return (
      <Placeholder content={<Placeholder.Image square />} {...{ className }} />
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

  errorData () {
    const { circular } = this.props

    const imageDefault =
      'https://lastfm.freetls.fastly.net/i/u/300x300/' +
      '2a96cbd8b46e442fc41c2b86b821562f.png'

    return (
      <Image
        wrapped
        className="imageWrapBordered"
        src={imageDefault}
        rounded={!circular}
        {...{ circular }}
      />
    )
  }

  render () {
    const { isLoading, images, error } = this.state

    const placeholderImageData = isLoading && this.placeholderImageData()

    const artistImageData = images && this.artistImageData()

    const errorData = error && this.errorData()

    const contentData = placeholderImageData || artistImageData || errorData

    return <React.Fragment>{contentData}</React.Fragment>
  }
}
