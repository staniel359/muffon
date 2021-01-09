import React from 'react'
import axios from 'axios'
import { Segment } from 'semantic-ui-react'
import setNavSections from './functions/setNavSections'
import handleTrackChange from './functions/handleTrackChange'
import getData from './functions/getData'
import pageData from './functions/pageData'

export default class Description extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}

    this.setNavSections = setNavSections.bind(this)
    this.handleTrackChange = handleTrackChange.bind(this)
    this.getData = getData.bind(this)
    this.pageData = pageData.bind(this)
  }

  componentDidMount () {
    this.request = axios.CancelToken.source()

    const { artistName, trackTitle } = this.params()

    this.setNavSections(artistName, trackTitle)
    this.getData()
  }

  componentDidUpdate (prevProps, prevState) {
    this.handleTrackChange(prevProps)
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  dataName = 'description'
  navSectionData = 'Description'

  params = () => this.props.match.params

  contentData () {
    const descriptionData = (
      <div className="whiteSpacePreWrap">{this.state.data}</div>
    )

    return <Segment className="pageSegment" content={descriptionData} />
  }

  render () {
    return <React.Fragment>{this.pageData()}</React.Fragment>
  }
}
