import React from 'react'
import { Image, Header, Transition, Dimmer } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Left extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { artistNameVisible: false, dimmerActive: false }
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const artistNameVisible = window.scrollY >= 60
    const visibilityChanged = artistNameVisible !== this.state.artistNameVisible

    visibilityChanged && this.setState({ ...{ artistNameVisible } })
  }

  render () {
    const { album } = this.props
    const { artistNameVisible, dimmerActive } = this.state

    const showDimmer = () => this.setState({ dimmerActive: true })
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
      visible: artistNameVisible,
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

    const hideDimmer = () => this.setState({ dimmerActive: false })
    const dimmerImage = album.images.original
    const dimmerImageData = <Image src={dimmerImage} />
    const dimmerData = (
      <Dimmer
        page
        className="albumPageDimmer"
        active={dimmerActive}
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
