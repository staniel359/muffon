import React from 'react'
import { Segment } from 'semantic-ui-react'
import Main from './data/Main'
import Extra from './data/Extra'
import getData from './functions/getData'
import setNavSections from './functions/setNavSections'
import checkTrackChange from './functions/checkTrackChange'
import pageData from './functions/pageData'

export default class Show extends React.PureComponent {
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

  dataName = 'track'

  contentData () {
    const dataProps = { track: this.state.data }

    const pageData = (
      <React.Fragment>
        <Main {...dataProps} />
        <Extra {...dataProps} />
      </React.Fragment>
    )

    return <Segment className="pageSegment" content={pageData} />
  }

  render () {
    return <React.Fragment>{this.pageData()}</React.Fragment>
  }
}
