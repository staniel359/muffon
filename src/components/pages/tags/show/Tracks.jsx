import React from 'react'
import List from '../tracks/List'
import getData from './functions/getData'
import segmentData from './functions/segmentData'
import paginatedData from 'global/paginated/functions/paginatedData'

export default class Tracks extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      isLoaded: false,
      isPageable: true
    }

    this.getData = getData.bind(this)
    this.segmentData = segmentData.bind(this)
    this.paginatedData = paginatedData.bind(this)
  }

  componentDidMount () {
    this.getData()
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  dataName = 'tracks'
  headerText = 'Top tracks'
  itemsPerRow = 0
  clientPageLimit = 10
  responsePageLimit = 50
  dataList = (<List />)

  contentData = () => this.paginatedData()

  render () {
    return <React.Fragment>{this.segmentData()}</React.Fragment>
  }
}
