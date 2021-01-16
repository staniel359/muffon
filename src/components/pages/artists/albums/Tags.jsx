import React from 'react'
import Tags from 'global/Tags'
import pageData from './functions/pageData'
import getData from './functions/getData'
import getAlbumData from './select/functions/getAlbumData'
import setNavSections from './functions/setNavSections'
import checkAlbumChange from './functions/checkAlbumChange'

export default class AlbumTags extends React.PureComponent {
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

  dataName = 'tags'
  navSectionData = 'Tags'

  contentData () {
    const { tags } = this.state.data

    const tagsProps = { tags }

    return (
      <React.Fragment>
        <Tags {...tagsProps} />
      </React.Fragment>
    )
  }

  render () {
    return <React.Fragment>{this.pageData()}</React.Fragment>
  }
}
