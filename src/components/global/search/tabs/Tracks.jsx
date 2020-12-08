import React from 'react'
import axios from 'axios'
import List from './tracks/List'
import getData from './functions/getData'
import tabData from './functions/tabData'
import paginatedData from 'global/functions/paginatedData'

export default class Tracks extends React.PureComponent {
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

  dataName = 'tracks'
  itemsPerRow = 0
  clientPageLimit = 50
  requestPageLimit = 50
  responsePageLimit = 50
  dataList = (<List />)

  tabRef = this.props.tracksRef

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
