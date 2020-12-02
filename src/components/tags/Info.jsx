import React from 'react'
import axios from 'axios'
import ErrorMessage from 'partials/ErrorMessage'
import { Segment, Header, Icon, Label, Image } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'

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

  getData () {
    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
    }

    switchLoader(true)

    const tagNameEncoded = encodeURIComponent(this.props.tagName)
    const url = `/lastfm/tags/${tagNameEncoded}`
    const cancelToken = this.request.token
    const extra = { ...{ cancelToken } }

    const handleSuccess = resp => {
      const { tag } = resp.data

      const error = null

      this.setState({ ...{ tag, error } })
    }

    const handleError = error => {
      const tag = null

      !axios.isCancel(error) && this.setState({ ...{ tag, error } })
    }

    const handleFinish = () => switchLoader(false)

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(handleFinish)
  }

  tagData () {
    const { tag } = this.state
    const { artistImages } = this.props

    const imageData = src => (
      <Image className="tagPageHeaderImage" key={uuid()} {...{ src }} />
    )
    const artistImagesList =
      artistImages && artistImages.slice(0, 18).map(imageData)
    const coverData = (
      <div className="tagsPageSegmentMainCover">{artistImagesList}</div>
    )

    const headerData = (
      <div className="tagPageTagName">
        <Icon name="tag" size="large" />
        <Header as="h1" content={tag.name} />
      </div>
    )

    const taggersCount = tag.taggers_count.toLocaleString('eu')
    const taggingsCount = tag.taggings_count.toLocaleString('eu')
    const countersData = (
      <Label.Group className="tagPageCounters" size="large">
        <Label basic icon="user" content={taggersCount} />
        <Label basic icon="tags" content={taggingsCount} />
      </Label.Group>
    )

    const descriptionData = (
      <div className="tagPageDescription">
        {tag.description || 'No description.'}
      </div>
    )

    const contentData = (
      <div className="tagsPageSegmentMainContent">
        {headerData}
        {countersData}
        {descriptionData}
      </div>
    )

    return (
      <React.Fragment>
        {coverData}
        {contentData}
      </React.Fragment>
    )
  }

  render () {
    const { tag, error, loading } = this.state

    const segmentClassName = `tagsPageSegment ${
      !error && 'tagsPageSegmentMain'
    }`

    const tagData = tag && this.tagData()

    const errorData = error && <ErrorMessage {...{ error }} />

    const contentData = tagData || errorData

    return (
      <Segment.Group className="tagsPageSegmentWrap">
        <Segment
          className={segmentClassName}
          content={contentData}
          {...{ loading }}
        />
      </Segment.Group>
    )
  }
}
