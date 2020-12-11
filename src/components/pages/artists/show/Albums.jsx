import React from 'react'
import { Header } from 'semantic-ui-react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import List from '../albums/List'
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
  itemsPerRow = 3
  clientPageLimit = 3
  requestPageLimit = 20
  responsePageLimit = 20
  dataList = (<List />)

  artistNameEncoded = encodeURIComponent(this.props.artistName)

  contentData = () => this.paginatedData()

  headerData () {
    const albumsPageLink = `/artists/${this.artistNameEncoded}/albums`

    return (
      <Header as="h3">
        <Link to={albumsPageLink}>Top albums</Link>
      </Header>
    )
  }

  render () {
    return <React.Fragment>{this.segmentData()}</React.Fragment>
  }
}
