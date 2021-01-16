import React from 'react'
import { Image, Header, Transition, Dimmer } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Select from '../Select'

export default class Left extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isTransitionVisible: false, isDimmerActive: false }
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const isTransitionVisible = window.scrollY >= 60
    const isVisibilityChanged =
      isTransitionVisible !== this.state.isTransitionVisible

    isVisibilityChanged && this.setState({ isTransitionVisible })
  }

  imageData () {
    const { album } = this.props

    const showDimmer = () => this.setState({ isDimmerActive: true })

    return (
      <Image
        rounded
        wrapped
        className="imageWrapBordered clickable"
        src={album.images.medium}
        onClick={showDimmer}
      />
    )
  }

  transitionData () {
    const { isTransitionVisible } = this.state
    const { album } = this.props

    const transitionProps = {
      visible: isTransitionVisible,
      transitionOnMount: false,
      animation: 'fade',
      duration: 200,
      mountOnShow: false
    }

    const albumTitleData = (
      <Header
        as="h3"
        textAlign="center"
        className="transitionText"
        content={album.title}
      />
    )

    const artistNameEncoded = encodeURIComponent(album.artist)
    const artistPageLink = `/artists/${artistNameEncoded}`
    const artistNameData = (
      <Header as="h4" textAlign="center" className="transitionText">
        <Link to={artistPageLink}>{album.artist}</Link>
      </Header>
    )

    const transitionText = (
      <div className="transitionTextWrap">
        {albumTitleData}
        {artistNameData}
      </div>
    )

    return <Transition {...transitionProps}>{transitionText}</Transition>
  }

  dimmerData () {
    const { isDimmerActive } = this.state
    const { album } = this.props

    const hideDimmer = () => this.setState({ isDimmerActive: false })

    return (
      <Dimmer
        page
        className="albumPageDimmer"
        active={isDimmerActive}
        onClick={hideDimmer}
      >
        <Image src={album.images.original} />
      </Dimmer>
    )
  }

  selectData () {
    const { album, getAlbumData, setRequestData } = this.props
    const { artist, title } = album

    const requestData = { artist, title }
    const selectProps = { requestData, getAlbumData, setRequestData }

    return <Select {...selectProps} />
  }

  render () {
    return (
      <div className="albumPageLeftColumn">
        {this.imageData()}
        {this.transitionData()}
        {this.dimmerData()}
        {this.selectData()}
      </div>
    )
  }
}
