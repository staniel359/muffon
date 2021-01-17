import React from 'react'
import { Segment } from 'semantic-ui-react'
import getData from './functions/getData'
import setNavSections from './functions/setNavSections'
import checkTrackChange from './functions/checkTrackChange'
import pageData from './functions/pageData'

export default class Description extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      isLoaded: false,
      isPageable: false
    }

    this.getData = getData.bind(this)
    this.setNavSections = setNavSections.bind(this)
    this.checkTrackChange = checkTrackChange.bind(this)
    this.pageData = pageData.bind(this)
  }

  componentDidMount () {
    this.getData()
    this.setNavSections()
  }

  componentDidUpdate (prevProps, prevState) {
    this.checkTrackChange(prevProps)
    this.setNavSections()
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  dataName = 'description'
  navSectionData = 'Description'

  contentData () {
    const description = this.state.data

    const descriptionData = (
      <div className="whiteSpacePreWrap">{description}</div>
    )

    return <Segment className="pageSegment" content={descriptionData} />
  }

  render () {
    return <React.Fragment>{this.pageData()}</React.Fragment>
  }
}
