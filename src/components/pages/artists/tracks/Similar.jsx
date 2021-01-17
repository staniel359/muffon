import React from 'react'
import { Segment } from 'semantic-ui-react'
import List from './similar/List'
import getData from './functions/getData'
import setNavSections from './functions/setNavSections'
import checkTrackChange from './functions/checkTrackChange'
import pageData from './functions/pageData'
import paginatedData from 'global/paginated/functions/paginatedData'

export default class Similar extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      isLoaded: false,
      isPageable: true
    }

    this.getData = getData.bind(this)
    this.setNavSections = setNavSections.bind(this)
    this.checkTrackChange = checkTrackChange.bind(this)
    this.pageData = pageData.bind(this)
    this.paginatedData = paginatedData.bind(this)
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

  dataName = 'similar'
  navSectionData = 'Similar'
  itemsPerRow = 0
  clientPageLimit = 50
  requestPageLimit = 50
  responsePageLimit = 50
  dataList = (<List />)

  contentData () {
    const { isLoading } = this.state

    return (
      <Segment
        className="pageSegment paginatedWrap"
        loading={isLoading}
        content={this.paginatedData()}
      />
    )
  }

  render () {
    return <React.Fragment>{this.pageData()}</React.Fragment>
  }
}
