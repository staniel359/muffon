import React from 'react'
import { Header, Transition } from 'semantic-ui-react'
import Image from 'global/artists/Image'
import PageMenu from '../utils/PageMenu'
import Scrollspy from '../utils/Scrollspy'

export default class Left extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isTransitionVisible: false, menuActiveItem: 'info' }
  }

  imageData () {
    const { artistName } = this.props

    const imageProps = { artistName }

    return (
      <div className="artistPageArtistImageWrap">
        <Image dimmer {...imageProps} />
      </div>
    )
  }

  transitionData () {
    const { isTransitionVisible } = this.state
    const { artistName } = this.props

    const transitionProps = {
      visible: isTransitionVisible,
      transitionOnMount: false,
      animation: 'fade',
      duration: 200,
      mountOnShow: false
    }

    const contentData = (
      <div className="transitionTextWrap">
        <Header
          size="medium"
          textAlign="center"
          className="transitionText"
          content={artistName}
          inverted
        />
      </div>
    )

    return <Transition {...transitionProps}>{contentData}</Transition>
  }

  pageMenuData () {
    const { menuActiveItem } = this.state
    const { scrollToTop } = this.props

    const pageMenuProps = { menuActiveItem, scrollToTop }

    return <PageMenu {...pageMenuProps} />
  }

  scrollspyData () {
    const { segmentTop } = this.props

    const setArtistNameVisibility = isTransitionVisible => {
      const isVisibilityChanged =
        isTransitionVisible !== this.state.isTransitionVisible

      isVisibilityChanged && this.setState({ isTransitionVisible })
    }

    const setMenuActiveItem = menuActiveItem => {
      const isActiveItemChanged = menuActiveItem !== this.state.menuActiveItem

      isActiveItemChanged && this.setState({ menuActiveItem })
    }

    const scrollspyProps = {
      setArtistNameVisibility,
      setMenuActiveItem,
      segmentTop
    }

    return <Scrollspy {...scrollspyProps} />
  }

  render () {
    return (
      <div className="artistPageLeftColumn">
        {this.imageData()}
        {this.transitionData()}
        {this.pageMenuData()}
        {this.scrollspyData()}
      </div>
    )
  }
}
