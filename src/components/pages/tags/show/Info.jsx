import React from 'react'
import Data from './info/Data'
import getData from './functions/getData'
import segmentData from './functions/segmentData'

export default class Info extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      isLoaded: false,
      isPageable: false
    }

    this.getData = getData.bind(this)
    this.segmentData = segmentData.bind(this)
  }

  componentDidMount () {
    this.getData()
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  dataName = 'info'

  contentData () {
    const { artistImages } = this.props

    const dataProps = { tag: this.state.data, artistImages }

    return <Data {...dataProps} />
  }

  render () {
    return <React.Fragment>{this.segmentData()}</React.Fragment>
  }
}
