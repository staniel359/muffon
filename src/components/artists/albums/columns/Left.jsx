import React from 'react'
import { Image, Header, Transition } from 'semantic-ui-react'

export default class Left extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { transitionVisible: false }
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
    const { info } = this.props
    const { transitionVisible } = this.state

    const defaultCover =
      'https://lastfm.freetls.fastly.net/i/u/300x300/' +
      'c6f59c1e5e7240a4c0d427abd71f3dbb.png'
    const cover = info.covers.medium || defaultCover
    const coverData = (
      <Image
        rounded
        wrapped
        className="imageWrapBordered albumPageAlbumCover"
        src={cover}
      />
    )

    const transitionProps = {
      visible: transitionVisible,
      transitionOnMount: false,
      animation: 'fade',
      duration: 200,
      mountOnShow: false
    }

    const albumTitle = info.title
    const artistName = info.artist
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

    return (
      <div className="albumPageLeftColumn">
        {coverData}

        {transitionData}
      </div>
    )
  }
}
