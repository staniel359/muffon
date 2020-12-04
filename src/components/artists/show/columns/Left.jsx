import React from 'react'
import { Header, Transition } from 'semantic-ui-react'
import Picture from 'global/artists/Picture'
import PageMenu from '../utils/PageMenu'
import Scrollspy from '../utils/Scrollspy'

export default class Left extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { artistNameVisible: false, menuActiveItem: 'info' }
  }

  render () {
    const { artistName, segmentTop, scrollToTop } = this.props
    const { artistNameVisible, menuActiveItem } = this.state

    const pictureProps = { artistName }

    const transitionProps = {
      visible: artistNameVisible,
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
      const visibilityChanged = artistNameVisible !== bool

      visibilityChanged && this.setState({ artistNameVisible: bool })
    }

    const setMenuActiveItem = item => {
      const activeItemChanged = menuActiveItem !== item

      activeItemChanged && this.setState({ menuActiveItem: item })
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
