import React from 'react'
import { Header, Transition } from 'semantic-ui-react'
import Picture from 'global/artists/Picture'
import PageMenu from '../utils/PageMenu'
import Scrollspy from '../utils/Scrollspy'

export default class Left extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { transitionVisible: false, menuActiveItem: 'info' }
  }

  render () {
    const { artistName, segmentTop, scrollToSegmentTop } = this.props
    const { menuActiveItem, transitionVisible } = this.state

    const pictureProps = { artistName }

    const transitionProps = {
      visible: transitionVisible,
      transitionOnMount: false,
      animation: 'fade',
      duration: 200,
      mountOnShow: false
    }
    const transitionText = (
      <Header
        size="medium"
        textAlign="center"
        className="artistPageLeftColumnText"
        content={artistName}
        inverted
      />
    )

    const pageMenuProps = { menuActiveItem, scrollToSegmentTop }

    const toggleArtistName = bool => {
      transitionVisible !== bool && this.setState({ transitionVisible: bool })
    }
    const setMenuActiveItem = item => {
      menuActiveItem !== item && this.setState({ menuActiveItem: item })
    }
    const scrollspyProps = { toggleArtistName, setMenuActiveItem, segmentTop }

    return (
      <div className="artistPageLeftColumn">
        <Picture dimmer {...pictureProps} />

        <Transition {...transitionProps}>{transitionText}</Transition>

        <PageMenu {...pageMenuProps} />

        <Scrollspy {...scrollspyProps} />
      </div>
    )
  }
}
