import React from 'react'
import axios from 'axios'
import { Segment } from 'semantic-ui-react'
import List from './tracks/List'
import setNavSections from './functions/setNavSections'
import getData from './functions/getData'
import handleTagChange from './functions/handleTagChange'
import pageData from './functions/pageData'
import paginatedData from 'global/functions/paginatedData'

export default class Tracks extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }

    this.setNavSections = setNavSections.bind(this)
    this.getData = getData.bind(this)
    this.handleTagChange = handleTagChange.bind(this)
    this.pageData = pageData.bind(this)
    this.paginatedData = paginatedData.bind(this)
  }

  componentDidMount () {
    this.request = axios.CancelToken.source()

    this.setNavSections(this.params().tagName)
    this.getData()
  }

  componentDidUpdate (prevProps, prevState) {
    this.handleTagChange(prevProps)
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  dataName = 'tracks'
  navSectionData = 'Tracks'
  itemsPerRow = 0
  clientPageLimit = 50
  responsePageLimit = 50
  dataList = (<List />)

  params = () => this.props.match.params

  contentData () {
    const { isLoading } = this.state

    return (
      <Segment className="pageSegment paginatedWrap" loading={isLoading}>
        {this.paginatedData()}
      </Segment>
    )
  }

  render () {
    return <React.Fragment>{this.pageData()}</React.Fragment>
  }
}
