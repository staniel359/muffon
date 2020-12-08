import React from 'react'
import LeftColumn from './show/columns/Left'
import RightColumn from './show/columns/Right'
import axios from 'axios'
import setNavSections from './functions/setNavSections'
import getData from './functions/getData'
import handleArtistChange from './functions/handleArtistChange'
import pageData from './functions/pageData'
import 'styles/Artists.sass'

export default class Show extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}

    this.setNavSections = setNavSections.bind(this)
    this.getData = getData.bind(this)
    this.handleArtistChange = handleArtistChange.bind(this)
    this.pageData = pageData.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
    this.request = axios.CancelToken.source()

    this.setNavSections(this.params().artistName)
    this.getData()
  }

  componentDidUpdate (prevProps, prevState) {
    this.handleArtistChange(prevProps)
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  dataName = 'artist'

  params = () => this.props.match.params

  contentData () {
    const { artistName } = this.state

    const infoRef = React.createRef()
    const tracksRef = React.createRef()
    const albumsRef = React.createRef()
    const similarRef = React.createRef()

    const refs = { infoRef, tracksRef, albumsRef, similarRef }

    const segment = name => refs[`${name}Ref`]
    const segmentTop = name => segment(name).current.offsetTop - 60
    const scrollToTop = name => window.scrollTo(0, segmentTop(name))

    const leftColumnProps = { artistName, scrollToTop, segmentTop }
    const rightColumnProps = { artistName, scrollToTop, refs }

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
