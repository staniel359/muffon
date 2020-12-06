import React from 'react'
import { Header, Transition } from 'semantic-ui-react'
import Picture from 'global/artists/Picture'
import PageMenu from '../utils/PageMenu'
import Scrollspy from '../utils/Scrollspy'

export default class Left extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isArtistNameVisible: false, menuActiveItem: 'info' }
  }

  render () {
    const { artistName, segmentTop, scrollToTop } = this.props
    const { isArtistNameVisible, menuActiveItem } = this.state

    const pictureProps = { artistName }

    const transitionProps = {
      visible: isArtistNameVisible,
      transitionOnMount: false,
      animation: 'fade',
      duration: 200,
      mountOnShow: false
    }

    const transitionData = (
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

    const pageMenuProps = { menuActiveItem, scrollToTop }

    const setArtistNameVisibility = bool => {
      const isVisibilityChanged = isArtistNameVisible !== bool

      isVisibilityChanged && this.setState({ isArtistNameVisible: bool })
    }

    const setMenuActiveItem = item => {
      const isActiveItemChanged = menuActiveItem !== item

      isActiveItemChanged && this.setState({ menuActiveItem: item })
    }

    const scrollspyProps = {
      setArtistNameVisibility,
      setMenuActiveItem,
      segmentTop
    }

    return (
      <div className="artistPageLeftColumn">
        <div className="artistPageArtistImage">
          <Picture dimmer {...pictureProps} />
        </div>

        <Transition {...transitionProps}>{transitionData}</Transition>

        <PageMenu {...pageMenuProps} />

        <Scrollspy {...scrollspyProps} />
      </div>
    )
  }
}
