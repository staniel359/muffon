import React from 'react'
import Info from './show/Info'
import Image from './show/Image'
import Tracks from './show/Tracks'
import Albums from './show/Albums'
import Similar from './show/Similar'
import { Header, Transition, Dimmer, Loader } from 'semantic-ui-react'
import ErrorData from '../partials/ErrorData'

export class Show extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      windowScrolled: false
    }
  }

  componentDidMount () {
    window.onscroll = () =>
      this.setState({
        windowScrolled: !!window.scrollY
      })
  }

  loader () {
    return (
      <Dimmer className="fixed" active inverted content={<Loader inverted />} />
    )
  }

  leftColumn () {
    return (
      <div className="artistPageLeftColumn">
        {this.state.artistName && (
          <Image artistName={this.artistNameEncoded()} />
        )}

        {this.state.artistName && this.artistLeftColumnName()}
      </div>
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
        <Header
          size="medium"
          textAlign="center"
          className="artistPageLeftColumnName"
          content={this.state.artistName}
        />
      </Transition>
    )
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
          <Tracks artistName={this.artistNameEncoded()} />
        )}

        {this.state.artistName && (
          <Albums artistName={this.artistNameEncoded()} />
        )}

        {this.state.artistName && (
          <Similar artistName={this.artistNameEncoded()} />
        )}
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

  render () {
    return (
      <React.Fragment>
        {this.state.loading && this.loader()}

        {(this.state.error && this.errorData()) || this.data()}
      </React.Fragment>
    )
  }
}
