import React from 'react'
import axios from 'axios'
import { Header } from 'semantic-ui-react'
import List from '../albums/List'
import { Link } from 'react-router-dom'
import getData from './functions/getData'
import segmentData from './functions/segmentData'
import paginatedData from 'global/paginated/functions/paginatedData'

export default class Albums extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }

    this.getData = getData.bind(this)
    this.segmentData = segmentData.bind(this)
    this.paginatedData = paginatedData.bind(this)
  }

  componentDidMount () {
    this.request = axios.CancelToken.source()

    this.getData()
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  dataName = 'albums'
  itemsPerRow = 4
  clientPageLimit = 4
  responsePageLimit = 20
  dataList = (<List />)

  tagNameEncoded = encodeURIComponent(this.props.tagName)

  headerData () {
    const albumsPageLink = `/tags/${this.tagNameEncoded}/albums`

    return (
      <Header as="h3">
        <Link to={albumsPageLink}>Top albums</Link>
      </Header>
    )
  }

  contentData = () => this.paginatedData()

  render () {
    return <React.Fragment>{this.segmentData()}</React.Fragment>
  }
}
