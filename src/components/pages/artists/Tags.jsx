import React from 'react'
import { Segment } from 'semantic-ui-react'
import Tags from 'global/Tags'
import setNavSections from './functions/setNavSections'
import getData from './functions/getData'
import checkArtistChange from './functions/checkArtistChange'
import pageData from './functions/pageData'

export default class ArtistTags extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      isLoaded: false,
      isPageable: false
    }

    this.setNavSections = setNavSections.bind(this)
    this.getData = getData.bind(this)
    this.checkArtistChange = checkArtistChange.bind(this)
    this.pageData = pageData.bind(this)
  }

  componentDidMount () {
    this.getData()
    this.setNavSections()
  }

  componentDidUpdate (prevProps, prevState) {
    this.checkArtistChange(prevProps)
    this.setNavSections()
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  dataName = 'tags'
  navSectionData = 'Tags'

  contentData () {
    const tagsProps = { tags: this.state.data }

    const tagsData = <Tags {...tagsProps} />

    return <Segment className="pageSegment" content={tagsData} />
  }

  render () {
    return <React.Fragment>{this.pageData()}</React.Fragment>
  }
}
