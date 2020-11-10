import React from 'react'
import { Header, Transition } from 'semantic-ui-react'
import Picture from 'global/artists/Picture'
import PageMenu from '../utils/PageMenu'
import Scrollspy from '../utils/Scrollspy'

export default class Left extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { leftColumnName: false, menuActiveItem: 'info' }
  }

  render () {
    const { artistName, segmentTop, scrollToSegmentTop } = this.props
    const { menuActiveItem, leftColumnName } = this.state

    const pictureProps = { artistName }

    const transitionProps = {
      visible: leftColumnName,
      transitionOnMount: false,
      animation: 'fade',
      duration: 200,
      mountOnShow: false
    }
    const artistNameData = (
      <Header
        size="medium"
        textAlign="center"
        className="artistPageLeftColumnName"
        content={artistName}
        inverted
      />
    )

    const pageMenuProps = { menuActiveItem, scrollToSegmentTop }

    const toggleArtistName = bool => {
      leftColumnName !== bool && this.setState({ leftColumnName: bool })
    }
    const setMenuActiveItem = item => {
      menuActiveItem !== item && this.setState({ menuActiveItem: item })
    }
    const scrollspyProps = { toggleArtistName, setMenuActiveItem, segmentTop }

    return (
      <div className="artistPageLeftColumn">
        <Picture dimmer {...pictureProps} />

        <Transition {...transitionProps}>{artistNameData}</Transition>

        <PageMenu {...pageMenuProps} />

        <Scrollspy {...scrollspyProps} />
      </div>
    )
  }
}
