import React from 'react'
import { Segment } from 'semantic-ui-react'
import List from './albums/List'
import setNavSections from './functions/setNavSections'
import getData from './functions/getData'
import checkTagChange from './functions/checkTagChange'
import pageData from './functions/pageData'
import paginatedData from 'global/paginated/functions/paginatedData'

export default class Albums extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      isLoaded: false,
      isPageable: true
    }

    this.getData = getData.bind(this)
    this.setNavSections = setNavSections.bind(this)
    this.checkTagChange = checkTagChange.bind(this)
    this.pageData = pageData.bind(this)
    this.paginatedData = paginatedData.bind(this)
  }

  componentDidMount () {
    this.getData()
    this.setNavSections()
  }

  componentDidUpdate (prevProps, prevState) {
    this.checkTagChange(prevProps)
    this.setNavSections()
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  dataName = 'albums'
  navSectionData = 'Albums'
  itemsPerRow = 4
  clientPageLimit = 20
  responsePageLimit = 20
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
