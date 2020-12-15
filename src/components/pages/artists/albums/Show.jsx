import React from 'react'
import { Segment } from 'semantic-ui-react'
import axios from 'axios'
import LeftColumn from './columns/Left'
import RightColumn from './columns/Right'
import handleAlbumChange from './functions/handleAlbumChange'
import setNavSections from './functions/setNavSections'
import getData from './functions/getData'
import pageData from './functions/pageData'

export default class Show extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}

    this.handleAlbumChange = handleAlbumChange.bind(this)
    this.setNavSections = setNavSections.bind(this)
    this.getData = getData.bind(this)
    this.pageData = pageData.bind(this)
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
    const columnProps = { album: this.state.data }
    const pageData = (
      <React.Fragment>
        <LeftColumn {...columnProps} />
        <RightColumn {...columnProps} />
      </React.Fragment>
    )

    return <Segment className="pageSegment" content={pageData} />
  }

  render () {
    return <React.Fragment>{this.pageData()}</React.Fragment>
  }
}
