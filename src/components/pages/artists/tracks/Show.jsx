import React from 'react'
import { Segment } from 'semantic-ui-react'
import axios from 'axios'
import Main from './data/Main'
import Extra from './data/Extra'
import setNavSections from './functions/setNavSections'
import handleTrackChange from './functions/handleTrackChange'
import getData from './functions/getData'
import pageData from './functions/pageData'

export default class Show extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}

    this.setNavSections = setNavSections.bind(this)
    this.handleTrackChange = handleTrackChange.bind(this)
    this.getData = getData.bind(this)
    this.pageData = pageData.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
    this.request = axios.CancelToken.source()

    const { artistName, trackTitle } = this.params()

    this.setNavSections(artistName, trackTitle)
    this.getData()
  }

  componentDidUpdate (prevProps, prevState) {
    this.handleTrackChange(prevProps)
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  dataName = 'track'

  params = () => this.props.match.params

  contentData () {
    const dataProps = { track: this.state.data }

    return (
      <Segment className="pageSegment">
        <Main {...dataProps} />
        <Extra {...dataProps} />
      </Segment>
    )
  }

  render () {
    return <React.Fragment>{this.pageData()}</React.Fragment>
  }
}
