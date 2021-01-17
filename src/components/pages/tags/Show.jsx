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

  setArtistImages = images => {
    const { artistImages } = this.state

    !artistImages && this.setState({ artistImages: images })
  }

  contentData () {
    const { tag, artistImages } = this.state
    const { setArtistImages } = this

    const tagName = tag.name

    const artistsRef = React.createRef()
    const albumsRef = React.createRef()
    const tracksRef = React.createRef()

    const refs = { artistsRef, albumsRef, tracksRef }

    const segmentTop = name => {
      const segment = name => refs[`${name}Ref`]

      return segment(name).current.offsetTop - 60
    }
    const scrollToTop = name => window.scrollTo(0, segmentTop(name))

    const infoProps = { tagName, artistImages }
    const artistsProps = { tagName, setArtistImages, scrollToTop }
    const albumsProps = { tagName, scrollToTop }
    const tracksProps = { tagName, scrollToTop }

    return (
      <div className="tagPage">
        <Info {...infoProps} />
        <Ref innerRef={artistsRef}>
          <Artists {...artistsProps} />
        </Ref>
        <Ref innerRef={albumsRef}>
          <Albums {...albumsProps} />
        </Ref>
        <Ref innerRef={tracksRef}>
          <Tracks {...tracksProps} />
        </Ref>
      </div>
    )
  }

  render () {
    return <React.Fragment>{this.pageData()}</React.Fragment>
  }
}
