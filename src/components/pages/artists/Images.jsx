import React from 'react'
import axios from 'axios'
import { Segment } from 'semantic-ui-react'
import List from './images/List'
import setNavSections from './functions/setNavSections'
import getData from './functions/getData'
import handleArtistChange from './functions/handleArtistChange'
import pageData from './functions/pageData'
import paginatedData from 'global/paginated/functions/paginatedData'

export default class Images extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }

    this.setNavSections = setNavSections.bind(this)
    this.getData = getData.bind(this)
    this.handleArtistChange = handleArtistChange.bind(this)
    this.pageData = pageData.bind(this)
    this.paginatedData = paginatedData.bind(this)
  }

  componentDidMount () {
    this.request = axios.CancelToken.source()

    this.setNavSections(this.params().artistName)
    this.getData()
  }

  componentDidUpdate (prevProps, prevState) {
    this.handleArtistChange(prevProps)
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  dataName = 'images'
  navSectionData = 'Images'
  itemsPerRow = 4
  clientPageLimit = 20
  responsePageLimit = 40
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
