import React from 'react'
import { Header } from 'semantic-ui-react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import List from './similar/List'
import getData from './functions/getData'
import segmentData from './functions/segmentData'
import paginatedData from 'global/functions/paginatedData'

export default class Similar extends React.PureComponent {
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
  itemsPerRow = 4
  clientPageLimit = 4
  responsePageLimit = 10
  dataList = (<List />)

  artistNameEncoded = encodeURIComponent(this.props.artistName)

  contentData = () => this.paginatedData()

  headerData () {
    const similarPageLink = `/artists/${this.artistNameEncoded}/similar`

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
