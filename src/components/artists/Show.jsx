import React from 'react'
import Info from './show/Info'
import Tracks from './show/Tracks'
import Albums from './show/Albums'
import Similar from './show/Similar'
import Scrollspy from './show/Scrollspy'
import PageMenu from './show/PageMenu'
import Picture from 'global/artists/Picture'
import { Header, Transition, Dimmer, Loader } from 'semantic-ui-react'
import ErrorData from 'partials/ErrorData'
import { v4 as uuid } from 'uuid'
import 'styles/artists/Show.sass'

export default class Show extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      leftColumnArtistName: false,
      menuActiveItem: 'info'
    }
  }

  artistName = this.props.match.params.artistName
  navSections = [
    {
      key: uuid(),
      content: 'Artists'
    },
    {
      key: uuid(),
      content: decodeURIComponent(this.artistName),
      active: true
    }
  ]

  componentDidMount () {
    this.props.setNavSections(this.navSections)
  }

  loader () {
    return (
      <Dimmer className="fixed" active inverted content={<Loader inverted />} />
    )
  }

  errorData () {
    return this.state.error && <ErrorData error={this.state.error} />
  }

  data () {
    return (
      <React.Fragment>
        {this.leftColumn()}

        {this.rightColumn()}
      </React.Fragment>
    )
  }

  leftColumn () {
    return this.state.artistName && this.leftColumnData()
  }

  leftColumnData () {
    return (
      <div className="artistPageLeftColumn">
        <Picture artistName={this.state.artistName} dimmer slider />

        {this.leftColumnArtistName()}

        <PageMenu
          menuActiveItem={this.state.menuActiveItem}
          scrollToSegmentTop={this.scrollToSegmentTop}
        />

        {this.scrollspy()}
      </div>
    )
  }

  leftColumnArtistName () {
    return (
      <Transition
        visible={this.state.leftColumnArtistName}
        transitionOnMount={false}
        animation="fade"
        duration={200}
        mountOnShow={false}
      >
        <Header
          size="medium"
          textAlign="center"
          className="artistPageLeftColumnName"
          content={this.state.artistName}
          inverted
        />
      </Transition>
    )
  }

  scrollToSegmentTop = segmentID => {
    window.scrollTo(0, this.segmentTop(segmentID))
  }

  segmentTop = segmentID => {
    return document.getElementById(segmentID).offsetTop - 70
  }

  scrollspy () {
    return (
      <Scrollspy
        toggleLeftColumnArtistName={this.toggleLeftColumnArtistName}
        segmentTop={this.segmentTop}
        setMenuActiveItem={this.setMenuActiveItem}
      />
    )
  }

  toggleLeftColumnArtistName = bool => {
    if (this.state.leftColumnArtistName !== bool) {
      this.setState({ leftColumnArtistName: bool })
    }
  }

  setMenuActiveItem = item => {
    if (this.state.menuActiveItem !== item) {
      this.setState({ menuActiveItem: item })
    }
  }

  rightColumn () {
    const { artistName, handleError, stopLoader, setArtistName } = this
    const infoProps = { artistName, handleError, stopLoader, setArtistName }

    return (
      <div className="artistPageRightColumn">
        <Info {...infoProps} />

        {this.state.artistName && this.rightColumnData()}
      </div>
    )
  }

  handleError = error => {
    this.setState({ error: error })
  }

  stopLoader = () => {
    this.setState({ loading: false })
  }

  setArtistName = name => {
    this.setState({ artistName: name })
  }

  rightColumnData () {
    return (
      <React.Fragment>
        <Tracks
          artistName={this.state.artistName}
          scrollToSegmentTop={this.scrollToSegmentTop}
        />

        <Albums
          artistName={this.state.artistName}
          scrollToSegmentTop={this.scrollToSegmentTop}
        />

        <Similar
          artistName={this.state.artistName}
          scrollToSegmentTop={this.scrollToSegmentTop}
        />
      </React.Fragment>
    )
  }

  render () {
    return (
      <React.Fragment>
        {this.state.loading && this.loader()}

        {this.errorData() || this.data()}
      </React.Fragment>
    )
  }
}
