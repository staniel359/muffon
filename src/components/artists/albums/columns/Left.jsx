import React from 'react'
import { Image, Header, Transition, Dimmer } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Left extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isArtistNameVisible: false, isDimmerActive: false }
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const isArtistNameVisible = window.scrollY >= 60
    const isVisibilityChanged =
      isArtistNameVisible !== this.state.isArtistNameVisible

    isVisibilityChanged && this.setState({ ...{ isArtistNameVisible } })
  }

  render () {
    const { album } = this.props
    const { isArtistNameVisible, isDimmerActive } = this.state

    const showDimmer = () => this.setState({ isDimmerActive: true })
    const image = album.images.medium
    const imageData = (
      <Image
        rounded
        wrapped
        className="imageWrapBordered clickable"
        src={image}
        onClick={showDimmer}
      />
    )

    const transitionProps = {
      visible: isArtistNameVisible,
      transitionOnMount: false,
      animation: 'fade',
      duration: 200,
      mountOnShow: false
    }

    const albumTitle = album.title
    const artistName = album.artist
    const artistNameEncoded = encodeURIComponent(artistName)
    const artistPageLink = `/artists/${artistNameEncoded}`
    const artistPageLinkData = <Link to={artistPageLink}>{artistName}</Link>
    const transitionText = (
      <div className="transitionTextWrap">
        <Header
          as="h3"
          textAlign="center"
          className="transitionText"
          content={albumTitle}
        />
        <Header
          as="h4"
          textAlign="center"
          className="transitionText"
          content={artistPageLinkData}
        />
      </div>
    )

    const transitionData = (
      <Transition {...transitionProps}>{transitionText}</Transition>
    )

    const hideDimmer = () => this.setState({ isDimmerActive: false })
    const dimmerImage = album.images.original
    const dimmerImageData = <Image src={dimmerImage} />
    const dimmerData = (
      <Dimmer
        page
        className="albumPageDimmer"
        active={isDimmerActive}
        onClick={hideDimmer}
        content={dimmerImageData}
      />
    )

    return (
      <div className="albumPageLeftColumn">
        {imageData}
        {transitionData}
        {dimmerData}
      </div>
    )
  }
}
