import React from 'react'
import { Segment } from 'semantic-ui-react'
import Tags from 'global/Tags'
import getData from './functions/getData'
import setNavSections from './functions/setNavSections'
import checkTrackChange from './functions/checkTrackChange'
import pageData from './functions/pageData'

export default class TrackTags extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      isLoaded: false,
      isPageable: false
    }

    this.getData = getData.bind(this)
    this.setNavSections = setNavSections.bind(this)
    this.checkTrackChange = checkTrackChange.bind(this)
    this.pageData = pageData.bind(this)
  }

  componentDidMount () {
    this.getData()
    this.setNavSections()
  }

  componentDidUpdate (prevProps, prevState) {
    this.checkTrackChange(prevProps)
    this.setNavSections()
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  dataName = 'tags'
  navSectionData = 'Tags'

  contentData () {
    const tagsProps = { tags: this.state.data }

    const pageData = <Tags {...tagsProps} />

    return <Segment className="pageSegment" content={pageData} />
  }

  render () {
    return <React.Fragment>{this.pageData()}</React.Fragment>
  }
}
