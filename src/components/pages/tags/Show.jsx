import React from 'react'
import { Ref } from 'semantic-ui-react'
import Info from './show/Info'
import Artists from './show/Artists'
import Albums from './show/Albums'
import Tracks from './show/Tracks'
import getData from './functions/getData'
import setNavSections from './functions/setNavSections'
import checkTagChange from './functions/checkTagChange'
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
    this.checkTagChange = checkTagChange.bind(this)
    this.pageData = pageData.bind(this)

    this.artistsRef = React.createRef()
    this.albumsRef = React.createRef()
    this.tracksRef = React.createRef()
  }

  componentDidMount () {
    this.getData()
    this.setNavSections()
  }

  componentDidUpdate (prevProps, prevState) {
    this.checkTagChange(prevProps)
    this.setNavSections()
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  dataName = 'tag'

  contentData () {
    const { tag, artistImages } = this.state

    const tagName = tag.name

    const setArtistImages = images => {
      !artistImages && this.setState({ artistImages: images })
    }

    const scrollToTop = segmentName => {
      const segment = this[`${segmentName}Ref`]
      const segmentTop = segment.current.offsetTop - 60

      window.scrollTo(0, segmentTop)
    }

    const infoProps = { tagName, artistImages }
    const artistsProps = { tagName, setArtistImages, scrollToTop }
    const albumsProps = { tagName, scrollToTop }
    const tracksProps = { tagName, scrollToTop }

    return (
      <div className="tagPage">
        <Info {...infoProps} />
        <Ref innerRef={this.artistsRef}>
          <Artists {...artistsProps} />
        </Ref>
        <Ref innerRef={this.albumsRef}>
          <Albums {...albumsProps} />
        </Ref>
        <Ref innerRef={this.tracksRef}>
          <Tracks {...tracksProps} />
        </Ref>
      </div>
    )
  }

  render () {
    return <React.Fragment>{this.pageData()}</React.Fragment>
  }
}
