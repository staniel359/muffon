import React from 'react'
import pageData from './functions/pageData'
import getData from './functions/getData'
import getAlbumData from './select/functions/getAlbumData'
import setNavSections from './functions/setNavSections'
import checkAlbumChange from './functions/checkAlbumChange'

export default class Description extends React.PureComponent {
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

  dataName = 'description'
  navSectionData = 'Description'

  contentData () {
    const { description } = this.state.data

    return <div className="whiteSpacePreWrap">{description}</div>
  }

  render () {
    return <React.Fragment>{this.pageData()}</React.Fragment>
  }
}
