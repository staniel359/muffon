import React from 'react'
import axios from 'axios'
import { Segment } from 'semantic-ui-react'
import Tags from 'global/Tags'
import setNavSections from './functions/setNavSections'
import handleTrackChange from './functions/handleTrackChange'
import getData from './functions/getData'
import pageData from './functions/pageData'

export default class TrackTags extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}

    this.setNavSections = setNavSections.bind(this)
    this.handleTrackChange = handleTrackChange.bind(this)
    this.getData = getData.bind(this)
    this.pageData = pageData.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
    this.request = axios.CancelToken.source()

    const { artistName, trackTitle } = this.params()

    this.setNavSections(artistName, trackTitle)
    this.getData()
  }

  componentDidUpdate (prevProps, prevState) {
    this.handleTrackChange(prevProps)
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  dataName = 'tags'
  navSectionData = 'Tags'

  params = () => this.props.match.params

  contentData () {
    const tagsProps = { tags: this.state.data }

    return (
      <Segment className="pageSegment">
        <Tags {...tagsProps} />
      </Segment>
    )
  }

  render () {
    return <React.Fragment>{this.pageData()}</React.Fragment>
  }
}
