import React from 'react'
import axios from 'axios'
import LeftColumn from './columns/Left'
import RightColumn from './columns/Right'
import handleAlbumChange from './functions/handleAlbumChange'
import setNavSections from './functions/setNavSections'
import getData from './functions/getData'
import pageData from './functions/pageData'
import segmentData from './functions/segmentData'
import getVkAlbumData from './vk/functions/getAlbumData'
import getBandcampAlbumData from './bandcamp/functions/getAlbumData'

export default class Show extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}

    this.handleAlbumChange = handleAlbumChange.bind(this)
    this.setNavSections = setNavSections.bind(this)
    this.getData = getData.bind(this)
    this.pageData = pageData.bind(this)
    this.segmentData = segmentData.bind(this)
    this.getVkAlbumData = getVkAlbumData.bind(this)
    this.getBandcampAlbumData = getBandcampAlbumData.bind(this)
  }

  componentDidMount () {
    this.request = axios.CancelToken.source()

    const { artistName, albumTitle } = this.params()

    this.setNavSections(artistName, albumTitle)
    this.getData()
  }

  componentDidUpdate (prevProps, prevState) {
    this.handleAlbumChange(prevProps)
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  dataName = 'album'

  params = () => this.props.match.params

  contentData () {
    const { data, request, albumSource } = this.state
    const { getBandcampAlbumData, getVkAlbumData } = this

    const album = data
    const requestSource = request && request.source
    const leftColumnProps = {
      album,
      getBandcampAlbumData,
      getVkAlbumData,
      requestSource
    }
    const rightColumnProps = { album, albumSource }

    return (
      <React.Fragment>
        <LeftColumn {...leftColumnProps} />
        <RightColumn {...rightColumnProps} />
      </React.Fragment>
    )
  }

  render () {
    return <React.Fragment>{this.pageData()}</React.Fragment>
  }
}
