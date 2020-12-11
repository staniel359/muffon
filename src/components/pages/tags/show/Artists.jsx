import React from 'react'
import axios from 'axios'
import { Header } from 'semantic-ui-react'
import List from './artists/List'
import getData from './functions/getData'
import segmentData from './functions/segmentData'
import paginatedData from 'global/functions/paginatedData'

export default class Artists extends React.PureComponent {
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

  dataName = 'artists'
  itemsPerRow = 4
  clientPageLimit = 4
  responsePageLimit = 21
  dataList = (<List />)

  headerData () {
    return <Header as="h3" content="Top artists" />
  }

  contentData = () => this.paginatedData()

  render () {
    return <React.Fragment>{this.segmentData()}</React.Fragment>
  }
}
