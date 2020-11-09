import React from 'react'
import LeftColumn from './show/columns/Left'
import RightColumn from './show/columns/Right'
import ErrorData from 'partials/ErrorData'
import { Dimmer, Loader } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import axios from 'axios'
import 'styles/artists/Show.sass'

export default class Show extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: true }
  }

  componentDidMount () {
    this.setNavSections()
    this.setArtistName()
  }

  setNavSections () {
    const { params } = this.props.match

    const navSections = [
      { key: uuid(), content: 'Artists' },
      {
        key: uuid(),
        content: decodeURIComponent(params.artistName),
        active: true
      }
    ]

    this.props.setNavSections(navSections)
  }

  setArtistName () {
    const artistNameEncoded = this.props.match.params.artistName
    const url = `/lastfm/artists/${artistNameEncoded}`

    axios
      .get(url)
      .then(this.handleSuccess)
      .catch(this.handleError)
      .then(this.switchLoader)
  }

  handleSuccess = resp => {
    this.setState({ artistName: resp.data.artist.name })
  }

  handleError = error => {
    this.setState({ error: error })
  }

  switchLoader = bool => {
    this.setState({ loading: !!bool })
  }

  scrollToSegmentTop = segmentID => {
    window.scrollTo(0, this.segmentTop(segmentID))
  }

  segmentTop = segmentID => {
    return document.getElementById(segmentID).offsetTop - 70
  }

  render () {
    const { error, loading, artistName } = this.state
    const { scrollToSegmentTop, segmentTop } = this

    const loader = loading && (
      <Dimmer active inverted className="fixed" content={<Loader inverted />} />
    )

    const leftColumnProps = { artistName, scrollToSegmentTop, segmentTop }
    const leftColumn = <LeftColumn {...leftColumnProps} />
    const rightColumnProps = { artistName, scrollToSegmentTop }
    const rightColumn = <RightColumn {...rightColumnProps} />
    const successData = artistName && (
      <React.Fragment>
        {leftColumn}
        {rightColumn}
      </React.Fragment>
    )

    const errorData = error && <ErrorData {...{ error }} />

    const pageData = loader || successData || errorData

    return <React.Fragment>{pageData}</React.Fragment>
  }
}
