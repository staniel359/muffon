import React from 'react'
import axios from 'axios'
import { Segment } from 'semantic-ui-react'
import List from './similar/List'
import setNavSections from './functions/setNavSections'
import getData from './functions/getData'
import handleTrackChange from './functions/handleTrackChange'
import pageData from './functions/pageData'
import paginatedData from 'global/paginated/functions/paginatedData'

export default class Similar extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }

    this.setNavSections = setNavSections.bind(this)
    this.getData = getData.bind(this)
    this.handleTrackChange = handleTrackChange.bind(this)
    this.pageData = pageData.bind(this)
    this.paginatedData = paginatedData.bind(this)
  }

  componentDidMount () {
    this.request = axios.CancelToken.source()

    const { artistName, trackTitle } = this.params()

    this.setNavSections(artistName, trackTitle)
    this.getData()
  }

  componentDidUpdate (prevProps, prevState) {
    this.handleTrackChange(prevProps)
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

  params = () => this.props.match.params

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
