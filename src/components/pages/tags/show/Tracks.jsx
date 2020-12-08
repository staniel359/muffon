import React from 'react'
import axios from 'axios'
import { Header } from 'semantic-ui-react'
import getData from './functions/getData'
import segmentData from './functions/segmentData'
import paginatedData from 'global/functions/paginatedData'
import List from './tracks/List'

export default class Tracks extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }

    this.getData = getData.bind(this)
    this.segmentData = segmentData.bind(this)
    this.paginatedData = paginatedData.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
    this.request = axios.CancelToken.source()

    this.getData()
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  dataName = 'tracks'
  itemsPerRow = 0
  clientPageLimit = 10
  responsePageLimit = 50
  dataList = (<List />)

  headerData () {
    return <Header as="h3" content="Top tracks" />
  }

  contentData = () => this.paginatedData()

  render () {
    return <React.Fragment>{this.segmentData()}</React.Fragment>
  }
}
