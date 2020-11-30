import React from 'react'
import { Image, Header, Transition, Dimmer } from 'semantic-ui-react'

export default class Left extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { transitionVisible: false, dimmerActive: false }
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const { transitionVisible } = this.state

    const isVisible = window.scrollY >= 60
    const transitionChanged = transitionVisible !== isVisible

    transitionChanged && this.setState({ transitionVisible: isVisible })
  }

  render () {
    const { album } = this.props
    const { transitionVisible, dimmerActive } = this.state

    const cover = album.covers.medium
    const defaultCover =
      'https://lastfm.freetls.fastly.net/i/u/300x300/' +
      'c6f59c1e5e7240a4c0d427abd71f3dbb.png'
    const coverStyle = { cursor: cover ? 'pointer' : 'unset' }
    const showDimmer = () => this.setState({ dimmerActive: true })
    const coverData = (
      <Image
        rounded
        wrapped
        className="imageWrapBordered albumPageAlbumCover"
        src={cover || defaultCover}
        style={coverStyle}
        onClick={showDimmer}
      />
    )

    const transitionProps = {
      visible: transitionVisible,
      transitionOnMount: false,
      animation: 'fade',
      duration: 200,
      mountOnShow: false
    }

    const albumTitle = album.title
    const artistName = album.artist
    const transitionText = (
      <div>
        <Header
          as="h3"
          textAlign="center"
          className="albumPageLeftColumnText"
          content={albumTitle}
        />
        <Header
          as="h4"
          textAlign="center"
          className="albumPageLeftColumnText"
          content={artistName}
        />
      </div>
    )

    const transitionData = (
      <Transition {...transitionProps}>{transitionText}</Transition>
    )

    const dimmerImage = <Image src={album.covers.original} />
    const hideDimmer = () => this.setState({ dimmerActive: false })
    const dimmerData = cover && (
      <Dimmer
        page
        className="albumCoverDimmer"
        active={dimmerActive}
        onClick={hideDimmer}
        content={dimmerImage}
      />
    )

    return (
      <div className="albumPageLeftColumn">
        {coverData}

        {transitionData}

        {dimmerData}
      </div>
    )
  }
}
