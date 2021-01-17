import React from 'react'
import LeftColumn from './show/columns/Left'
import RightColumn from './show/columns/Right'
import setNavSections from './functions/setNavSections'
import getData from './functions/getData'
import checkArtistChange from './functions/checkArtistChange'
import pageData from './functions/pageData'

export default class Show extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      isLoaded: false,
      isPageable: false
    }

    this.setNavSections = setNavSections.bind(this)
    this.getData = getData.bind(this)
    this.checkArtistChange = checkArtistChange.bind(this)
    this.pageData = pageData.bind(this)
  }

  componentDidMount () {
    this.getData()
    this.setNavSections()
  }

  componentDidUpdate (prevProps, prevState) {
    this.checkArtistChange(prevProps)
    this.setNavSections()
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  dataName = 'artist'

  contentData () {
    const { artist } = this.state

    const artistName = artist.name

    const infoRef = React.createRef()
    const tracksRef = React.createRef()
    const albumsRef = React.createRef()
    const similarRef = React.createRef()

    const refs = { infoRef, tracksRef, albumsRef, similarRef }

    const segmentTop = name => {
      const segment = name => refs[`${name}Ref`]

      return segment(name).current.offsetTop - 60
    }

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
