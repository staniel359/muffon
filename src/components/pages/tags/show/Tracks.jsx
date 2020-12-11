import React from 'react'
import axios from 'axios'
import { Header } from 'semantic-ui-react'
import List from '../tracks/List'
import { Link } from 'react-router-dom'
import getData from './functions/getData'
import segmentData from './functions/segmentData'
import paginatedData from 'global/functions/paginatedData'

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
  responsePageLimit = 50
  dataList = (<List />)

  tagNameEncoded = encodeURIComponent(this.props.tagName)

  headerData () {
    const tracksPageLink = `/tags/${this.tagNameEncoded}/tracks`

    return (
      <Header as="h3">
        <Link to={tracksPageLink}>Top tracks</Link>
      </Header>
    )
  }

  contentData = () => this.paginatedData()

  render () {
    return <React.Fragment>{this.segmentData()}</React.Fragment>
  }
}
