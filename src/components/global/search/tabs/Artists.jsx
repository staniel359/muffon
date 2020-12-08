import React from 'react'
import axios from 'axios'
import List from './artists/List'
import getData from './functions/getData'
import tabData from './functions/tabData'
import paginatedData from 'global/functions/paginatedData'

export default class Artists extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }

    this.getData = getData.bind(this)
    this.tabData = tabData.bind(this)
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

  dataName = 'artists'
  itemsPerRow = 0
  clientPageLimit = 20
  requestPageLimit = 20
  responsePageLimit = 20
  dataList = (<List />)

  tabRef = this.props.artistsRef

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
