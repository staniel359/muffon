import React from 'react'
import { Header } from 'semantic-ui-react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import List from '../../similar/List'
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

  dataName = 'similar'
  itemsPerRow = 0
  clientPageLimit = 5
  requestPageLimit = 5
  responsePageLimit = 5
  dataList = (<List />)

  artistNameEncoded = encodeURIComponent(this.props.track.artist.name)
  trackTitleEncoded = encodeURIComponent(this.props.track.title)

  contentData = () => this.paginatedData()

  headerData = () => {
    const similarPageLink =
      `/artists/${this.artistNameEncoded}` +
      `/tracks/${this.trackTitleEncoded}/similar`

    return (
      <Header as="h3">
        <Link to={similarPageLink}>Similar</Link>
      </Header>
    )
  }

  render () {
    return <React.Fragment>{this.segmentData()}</React.Fragment>
  }
}
