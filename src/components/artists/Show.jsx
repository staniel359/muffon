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
    const { params } = this.props.match

    const url = `/lastfm/artists/${params.artistName}`

    const handleSuccess = resp => {
      this.setState({ artistName: resp.data.artist.name })
    }
    const handleError = error => this.setState({ error: error })
    const switchLoader = bool => this.setState({ loading: !!bool })

    axios.get(url).then(handleSuccess).catch(handleError).then(switchLoader)
  }

  render () {
    const { error, loading, artistName } = this.state

    const loader = loading && (
      <Dimmer active inverted className="fixed" content={<Loader inverted />} />
    )

    const pageTopOffset = 70
    const segmentTop = segmentID =>
      document.getElementById(segmentID).offsetTop - pageTopOffset
    const scrollToSegmentTop = segmentID =>
      window.scrollTo(0, segmentTop(segmentID))

    const leftColumnProps = { artistName, scrollToSegmentTop, segmentTop }
    const rightColumnProps = { artistName, scrollToSegmentTop }

    const successData = artistName && (
      <React.Fragment>
        <LeftColumn {...leftColumnProps} />
        <RightColumn {...rightColumnProps} />
      </React.Fragment>
    )

    const errorData = error && <ErrorData {...{ error }} />

    const pageData = loader || successData || errorData

    return <React.Fragment>{pageData}</React.Fragment>
  }
}
