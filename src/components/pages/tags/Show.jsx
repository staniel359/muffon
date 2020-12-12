import React from 'react'
import Info from './show/Info'
import Artists from './show/Artists'
import Albums from './show/Albums'
import Tracks from './show/Tracks'
import axios from 'axios'
import { Ref } from 'semantic-ui-react'
import setNavSections from './functions/setNavSections'
import handleTagChange from './functions/handleTagChange'
import getData from './functions/getData'
import pageData from './functions/pageData'

export default class Show extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }

    this.setNavSections = setNavSections.bind(this)
    this.handleTagChange = handleTagChange.bind(this)
    this.getData = getData.bind(this)
    this.pageData = pageData.bind(this)
  }

  componentDidMount () {
    this.request = axios.CancelToken.source()

    this.setNavSections(this.params().tagName)
    this.getData()
  }

  componentDidUpdate (prevProps, prevState) {
    this.handleTagChange(prevProps)
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  dataName = 'tag'

  params = () => this.props.match.params

  setArtistImages = artistImages => {
    !this.state.artistImages && this.setState({ artistImages })
  }

  contentData () {
    const { tagName, artistImages } = this.state
    const { setArtistImages } = this

    const artistsRef = React.createRef()
    const albumsRef = React.createRef()
    const tracksRef = React.createRef()

    const refs = { artistsRef, albumsRef, tracksRef }

    const segment = name => refs[`${name}Ref`]
    const segmentTop = name => segment(name).current.offsetTop - 60
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
