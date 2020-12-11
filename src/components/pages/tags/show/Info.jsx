import React from 'react'
import axios from 'axios'
import Data from './info/Data'
import getData from './functions/getData'
import segmentData from './functions/segmentData'

export default class Info extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }

    this.getData = getData.bind(this)
    this.segmentData = segmentData.bind(this)
  }

  componentDidMount () {
    this.request = axios.CancelToken.source()

    this.getData()
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  dataName = 'info'

  tagNameEncoded = encodeURIComponent(this.props.tagName)

  contentData () {
    const { artistImages } = this.props

    const dataProps = { tag: this.state.data, artistImages }

    return <Data {...dataProps} />
  }

  render () {
    return <React.Fragment>{this.segmentData()}</React.Fragment>
  }
}
