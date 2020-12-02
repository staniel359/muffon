import React from 'react'
import { v4 as uuid } from 'uuid'
import { Segment, Header, Label, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ErrorData from 'partials/ErrorData'

export default class Info extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false }
  }

  componentDidMount () {
    this._isMounted = true
    this.request = axios.CancelToken.source()

    this.getData()
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  artistNameEncoded = encodeURIComponent(this.props.artistName)

  getData () {
    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
    }

    switchLoader(true)

    const url = `/lastfm/artists/${this.artistNameEncoded}`
    const cancelToken = this.request.token
    const extra = { ...{ cancelToken } }

    const handleSuccess = resp => {
      const { artist } = resp.data

      const error = null

      this.setState({ ...{ artist, error } })
    }

    const handleError = error => {
      const artist = null

      !axios.isCancel(error) && this.setState({ ...{ error, artist } })
    }

    const handleFinish = () => switchLoader(false)

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(handleFinish)
  }

  infoData () {
    const { artist } = this.state
    const { name, tags, description } = artist

    const artistNameData = (
      <Header as="h1" className="artistPageArtistName" content={name} />
    )

    const tagData = tag => (
      <Label key={uuid()} as={Link} to={`/tags/${tag}`} content={tag} />
    )
    const tagsListData = tags.map(tagData)
    const tagsPageLink = `/artists/${this.artistNameEncoded}/tags`
    const tagsViewMoreData = tags.length > 0 && (
      <Label as={Link} to={tagsPageLink} content="..." />
    )
    const tagsData = (
      <Label.Group size="large">
        {tagsListData}
        {tagsViewMoreData}
      </Label.Group>
    )

    const listenersCount = artist.listeners_count.toLocaleString('eu')
    const playsCount = artist.plays_count.toLocaleString('eu')
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
    const { artist, loading, error } = this.state

    const infoData = artist && this.infoData()

    const errorData = error && <ErrorData {...{ error }} />

    const contentData = infoData || errorData

    return (
      <Segment.Group id="info" className="artistPageSegmentWrap">
        <Segment
          className="artistPageSegment"
          content={contentData}
          {...{ loading }}
        />
      </Segment.Group>
    )
  }
}
