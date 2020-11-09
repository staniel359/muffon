import React from 'react'
import { Header, Transition } from 'semantic-ui-react'
import Picture from 'global/artists/Picture'
import PageMenu from '../PageMenu'
import Scrollspy from '../Scrollspy'

export default class Left extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { leftColumnName: false, menuActiveItem: 'info' }
  }

  toggleArtistName = bool => {
    const valueChanged = this.state.leftColumnName !== bool

    valueChanged && this.setState({ leftColumnName: bool })
  }

  setMenuActiveItem = item => {
    const valueChanged = this.state.menuActiveItem !== item

    valueChanged && this.setState({ menuActiveItem: item })
  }

  render () {
    const { artistName, segmentTop, scrollToSegmentTop } = this.props
    const { menuActiveItem, leftColumnName } = this.state
    const { toggleArtistName, setMenuActiveItem } = this

    const pictureProps = { artistName }
    const pageMenuProps = { menuActiveItem, scrollToSegmentTop }
    const scrollspyProps = { toggleArtistName, setMenuActiveItem, segmentTop }

    const artistNameData = (
      <Header
        size="medium"
        textAlign="center"
        className="artistPageLeftColumnName"
        content={artistName}
        inverted
      />
    )

    const artistNameTransitionData = (
      <Transition
        visible={leftColumnName}
        transitionOnMount={false}
        animation="fade"
        duration={200}
        mountOnShow={false}
      >
        {artistNameData}
      </Transition>
    )

    return (
      <div className="artistPageLeftColumn">
        <Picture dimmer {...pictureProps} />

        {artistNameTransitionData}

        <PageMenu {...pageMenuProps} />

        <Scrollspy {...scrollspyProps} />
      </div>
    )
  }
}
