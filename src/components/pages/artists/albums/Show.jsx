import React from 'react'
import axios from 'axios'
import LeftColumn from './columns/Left'
import RightColumn from './columns/Right'
import handleAlbumChange from './functions/handleAlbumChange'
import setNavSections from './functions/setNavSections'
import getData from './functions/getData'
import pageData from './functions/pageData'
import segmentData from './functions/segmentData'
import getLastfmAlbumData from './select/functions/getLastfmAlbumData'
import getVkAlbumData from './select/functions/getVkAlbumData'
import getBandcampAlbumData from './select/functions/getBandcampAlbumData'
import getSoundCloudAlbumData from './select/functions/getSoundCloudAlbumData'

export default class Show extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}

    this.handleAlbumChange = handleAlbumChange.bind(this)
    this.setNavSections = setNavSections.bind(this)
    this.getData = getData.bind(this)
    this.pageData = pageData.bind(this)
    this.segmentData = segmentData.bind(this)
    this.getLastfmAlbumData = getLastfmAlbumData.bind(this)
    this.getVkAlbumData = getVkAlbumData.bind(this)
    this.getBandcampAlbumData = getBandcampAlbumData.bind(this)
    this.getSoundCloudAlbumData = getSoundCloudAlbumData.bind(this)
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
    const { data, requestData } = this.state
    const {
      getLastfmAlbumData,
      getVkAlbumData,
      getBandcampAlbumData,
      getSoundCloudAlbumData
    } = this

    const leftColumnProps = {
      album: data,
      getLastfmAlbumData,
      getVkAlbumData,
      getBandcampAlbumData,
      getSoundCloudAlbumData
    }

    const rightColumnProps = { album: data, requestData }

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
