import React from 'react'
import LeftColumn from './columns/Left'
import RightColumn from './columns/Right'
import pageData from './functions/pageData'
import getData from './functions/getData'
import getAlbumData from './select/functions/getAlbumData'
import setNavSections from './functions/setNavSections'
import checkAlbumChange from './functions/checkAlbumChange'

export default class Show extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoaded: false }

    this.pageData = pageData.bind(this)
    this.getData = getData.bind(this)
    this.getAlbumData = getAlbumData.bind(this)
    this.setNavSections = setNavSections.bind(this)
    this.checkAlbumChange = checkAlbumChange.bind(this)
  }

  componentDidMount () {
    this.getData()
    this.setNavSections()
  }

  componentDidUpdate (prevProps, prevState) {
    this.checkAlbumChange(prevProps)
    this.setNavSections()
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  dataName = 'album'

  contentData () {
    const { requestData } = this.state
    const { getAlbumData } = this

    const album = this.state.data
    const setRequestData = data => this.setState({ requestData: data })

    const leftColumnProps = { album, getAlbumData, setRequestData }
    const rightColumnProps = { album, requestData }

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
