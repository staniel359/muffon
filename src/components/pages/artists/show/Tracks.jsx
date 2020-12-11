import React from 'react'
import { Header } from 'semantic-ui-react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import List from './tracks/List'
import getData from './functions/getData'
import segmentData from './functions/segmentData'
import paginatedData from 'global/paginated/functions/paginatedData'

export default class Tracks extends React.PureComponent {
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

  dataName = 'tracks'
  itemsPerRow = 0
  clientPageLimit = 10
  requestPageLimit = 50
  responsePageLimit = 50
  dataList = (<List />)

  artistNameEncoded = encodeURIComponent(this.props.artistName)

  contentData = () => this.paginatedData()

  headerData () {
    const tracksPageLink = `/artists/${this.artistNameEncoded}/tracks`

    return (
      <Header as="h3">
        <Link to={tracksPageLink}>Top tracks</Link>
      </Header>
    )
  }

  render () {
    return <React.Fragment>{this.segmentData()}</React.Fragment>
  }
}
