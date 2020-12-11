import React from 'react'
import axios from 'axios'
import List from './albums/List'
import getData from './functions/getData'
import tabData from './functions/tabData'
import paginatedData from 'global/functions/paginatedData'

export default class Albums extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }

    this.getData = getData.bind(this)
    this.tabData = tabData.bind(this)
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
  itemsPerRow = 0
  clientPageLimit = 20
  requestPageLimit = 20
  responsePageLimit = 20
  dataList = (<List />)

  tabRef = this.props.albumsRef

  contentData () {
    return (
      <div className="searchResultsTabContent paginatedWrap">
        {this.paginatedData()}
      </div>
    )
  }

  render () {
    return <React.Fragment>{this.tabData()}</React.Fragment>
  }
}
