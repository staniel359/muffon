import React from 'react'
import Info from './show/Info'
import Picture from './show/Picture'
import Tracks from './show/Tracks'
import Albums from './show/Albums'
import Similar from './show/Similar'
import { Header, Transition, Dimmer, Loader, Menu } from 'semantic-ui-react'
import ErrorData from '../partials/ErrorData'

export class Show extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      windowScrolled: false,
      menuActiveItem: 'info'
    }
  }

  componentDidMount () {
    window.onscroll = () => this.handleWindowScroll()
  }

  handleWindowScroll () {
    this.setState({ windowScrolled: !!window.scrollY })
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
    return (
      this.state.artistName && (
        <div className="artistPageLeftColumn">
          <Picture artistName={this.artistNameEncoded()} />

          {this.artistLeftColumnName()}

          {this.artistLeftColumnMenu()}
        </div>
      )
    )
  }

  artistNameEncoded () {
    return encodeURIComponent(this.state.artistName)
  }

  artistLeftColumnName () {
    return (
      <Transition
        visible={this.state.windowScrolled}
        transitionOnMount={false}
        animation="fade"
        duration={200}
        mountOnShow={false}
      >
        {this.artistLeftColumnNameHeader()}
      </Transition>
    )
  }

  artistLeftColumnNameHeader () {
    return (
      <Header
        size="medium"
        textAlign="center"
        className="artistPageLeftColumnName"
        content={this.state.artistName}
      />
    )
  }

  artistLeftColumnMenu () {
    return (
      <Menu pointing secondary vertical className="w100">
        <Menu.Item
          name="info"
          active={this.state.menuActiveItem === 'info'}
          onClick={this.handleMenuItemClick}
        />
        <Menu.Item
          name="tracks"
          active={this.state.menuActiveItem === 'tracks'}
          onClick={this.handleMenuItemClick}
        />
        <Menu.Item
          name="albums"
          active={this.state.menuActiveItem === 'albums'}
          onClick={this.handleMenuItemClick}
        />
        <Menu.Item
          name="similar"
          active={this.state.menuActiveItem === 'similar'}
          onClick={this.handleMenuItemClick}
        />
      </Menu>
    )
  }

  handleMenuItemClick = (_, { name }) => {
    this.setState({ menuActiveItem: name })
    this.scrollToSegmentTop(this.segmentIDs[name])
  }

  segmentIDs = {
    info: 'artistPageInfoSegment',
    tracks: 'artistPageTracksSegment',
    albums: 'artistPageAlbumsSegment',
    similar: 'artistPageSimilarSegment'
  }

  rightColumn () {
    return (
      <div className="artistPageRightColumn">
        <Info
          artistName={this.props.match.params.artistName}
          handleError={this.handleError}
          stopLoader={this.stopLoader}
          setArtistName={this.setArtistName}
        />

        {this.state.artistName && (
          <React.Fragment>
            <Tracks
              artistName={this.artistNameEncoded()}
              scrollToSegmentTop={this.scrollToSegmentTop}
            />

            <Albums
              artistName={this.artistNameEncoded()}
              scrollToSegmentTop={this.scrollToSegmentTop}
            />

            <Similar
              artistName={this.artistNameEncoded()}
              scrollToSegmentTop={this.scrollToSegmentTop}
            />
          </React.Fragment>
        )}
      </div>
    )
  }

  scrollToSegmentTop = segmentID => {
    window.scrollTo(0, this.segmentTop(segmentID))
  }

  segmentTop (segmentID) {
    return document.getElementById(segmentID).offsetTop - 107
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

  render () {
    return (
      <React.Fragment>
        {this.state.loading && this.loader()}

        {this.errorData() || this.data()}
      </React.Fragment>
    )
  }
}
