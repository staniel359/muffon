import React from 'react'
import Info from './Info'
import Image from './Image'
import Tracks from './Tracks'
import Albums from './Albums'
import Similar from './Similar'
import { Segment, Header, Transition } from 'semantic-ui-react'

export default class PageData extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      windowScrolled: false
    }
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleWindowsScroll)
  }

  handleWindowsScroll = () => {
    this.setState({
      windowScrolled: !!window.scrollY
    })
  }

  leftColumn () {
    return (
      <React.Fragment>
        {this.artistImage()}

        {this.artistLeftColumnNameTransition()}
      </React.Fragment>
    )
  }

  artistImage () {
    return <Image image={this.props.image} />
  }

  artistLeftColumnNameTransition () {
    return (
      <Transition
        visible={this.state.windowScrolled}
        transitionOnMount={false}
        animation="fade"
        duration={200}
        mountOnShow={false}
      >
        {this.artistLeftColumnName()}
      </Transition>
    )
  }

  artistLeftColumnName () {
    return (
      <Header size="medium" textAlign="center" className="artistLeftColumnName">
        {this.props.info.name}
      </Header>
    )
  }

  rightColumn () {
    return (
      <React.Fragment>
        {this.artistInfo()}

        {this.topTracksData()}

        {this.topAlbumsData()}

        {this.similarData()}
      </React.Fragment>
    )
  }

  artistInfo () {
    return (
      <Segment>
        <Info info={this.props.info} />
      </Segment>
    )
  }

  topTracksData () {
    return (
      <React.Fragment>
        <Header as="h4" attached="top">
          Top tracks
        </Header>
        <Segment
          loading={!this.props.tracks}
          style={{ minHeight: '100px' }}
          attached="bottom"
        >
          {this.props.tracks && <Tracks tracks={this.props.tracks} />}
        </Segment>
      </React.Fragment>
    )
  }

  topAlbumsData () {
    return (
      <React.Fragment>
        <Header as="h4" attached="top">
          Top albums
        </Header>
        <Segment
          loading={!this.props.albums}
          style={{ minHeight: '100px' }}
          attached="bottom"
        >
          {this.props.albums && <Albums albums={this.props.albums} />}
        </Segment>
      </React.Fragment>
    )
  }

  similarData () {
    return (
      <React.Fragment>
        <Header as="h4" attached="top">
          Similar
        </Header>
        <Segment
          loading={!this.props.similar}
          style={{ minHeight: '100px' }}
          attached="bottom"
        >
          {this.props.similar && <Similar similar={this.props.info.similar} />}
        </Segment>
      </React.Fragment>
    )
  }

  render () {
    return (
      <React.Fragment>
        <div className="artistPageLeftColumn">{this.leftColumn()}</div>

        <div className="artistPageRightColumn">{this.rightColumn()}</div>
      </React.Fragment>
    )
  }
}
