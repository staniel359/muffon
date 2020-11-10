import React from 'react'
import { v4 as uuid } from 'uuid'
import { Segment, Header, Label, Divider } from 'semantic-ui-react'
import { HashRouter as Router, Link } from 'react-router-dom'
import axios from 'axios'
import ErrorData from 'partials/ErrorData'

export default class Info extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: true }
  }

  componentDidMount () {
    this.getInfo()
  }

  getInfo () {
    const switchLoader = bool => this.setState({ loading: !!bool })

    switchLoader(true)

    const artistNameEncoded = encodeURIComponent(this.props.artistName)
    const url = `/lastfm/artists/${artistNameEncoded}`

    const handleSuccess = resp => {
      this.setState({ info: resp.data.artist, error: null })
    }
    const handleError = error => {
      this.setState({ error: error, info: null })
    }

    axios.get(url).then(handleSuccess).catch(handleError).then(switchLoader)
  }

  infoData () {
    const { info } = this.state
    const { description, tags } = info

    const artistName = info.name
    const artistNameData = (
      <Header
        size="huge"
        className="artistPageArtistName"
        content={artistName}
      />
    )

    const tagData = tag => (
      <Label key={uuid()} as={Link} to={`/tags/${tag}`} content={tag} />
    )
    const tagsList = tags.map(tagData)
    const tagsData = (
      <Router>
        <Label.Group size="large">
          {tagsList}

          <Label as="a" content="..." />
        </Label.Group>
      </Router>
    )

    const listenersCount = info.listeners_count.toLocaleString('eu')
    const playsCount = info.plays_count.toLocaleString('eu')
    const countersData = (
      <Label.Group size="large">
        <Label basic icon="user" content={listenersCount} />
        <Label basic icon="music" content={playsCount} />
      </Label.Group>
    )

    const descriptionData = (
      <div className="artistPageDescription">
        {description || 'No description.'}
      </div>
    )

    return (
      <React.Fragment>
        {artistNameData}
        {tagsData}
        {countersData}
        <Divider />
        {descriptionData}
      </React.Fragment>
    )
  }

  render () {
    const { info, loading, error } = this.state

    const infoData = info && this.infoData()
    const errorData = error && <ErrorData {...{ error }} />
    const content = infoData || errorData

    return (
      <Segment.Group id="info" className="artistPageSegmentWrap">
        <Segment
          className="artistPageSegment"
          loading={loading}
          content={content}
        />
      </Segment.Group>
    )
  }
}
