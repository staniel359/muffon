import React from 'react'
import { v4 as uuid } from 'uuid'
import {
  Segment,
  Image,
  Header,
  Label,
  Divider,
  List,
  Transition,
  Dimmer,
  Loader
} from 'semantic-ui-react'
import axios from 'axios'
import { HashRouter as Router, Link } from 'react-router-dom'
import Track from 'global/artists/Track'
import ErrorData from 'partials/ErrorData'
import 'styles/artists/albums/Show.sass'

export default class Show extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: true, transitionVisible: false }
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)

    this.request = axios.CancelToken.source()

    this.setNavSections()
    this.getAlbumInfo()
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)

    this.request.cancel()
  }

  handleScroll = () => {
    const { transitionVisible } = this.state

    const isVisible = window.scrollY >= 60
    const transitionChanged = transitionVisible !== isVisible

    transitionChanged && this.setState({ transitionVisible: isVisible })
  }

  getAlbumInfo () {
    const { params } = this.props.match

    const url = `/lastfm/artists/${params.artistName}/albums/${params.albumTitle}`
    const extra = { cancelToken: this.request.token }

    const handleSuccess = resp => this.setState({ info: resp.data.album })

    const handleError = error => this.setState({ error: error })

    const switchLoader = bool => this.setState({ loading: !!bool })

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(switchLoader)
  }

  setNavSections () {
    const { params } = this.props.match

    const navSections = [
      { key: uuid(), content: 'Artists' },
      {
        key: uuid(),
        content: decodeURIComponent(params.artistName),
        href: `#/artists/${params.artistName}`,
        active: true
      },
      { key: uuid(), content: 'Albums' },
      {
        key: uuid(),
        content: decodeURIComponent(params.albumTitle),
        active: true
      }
    ]

    this.props.setNavSections(navSections)
  }

  pageData () {
    const { info, transitionVisible } = this.state
    const { tags, description, tracks } = info

    const defaultCover =
      'https://lastfm.freetls.fastly.net/i/u/300x300/' +
      'c6f59c1e5e7240a4c0d427abd71f3dbb.png'
    const cover = info.covers.medium || defaultCover
    const coverData = (
      <Image
        rounded
        wrapped
        className="imageWrapBordered albumPageAlbumCover"
        src={cover}
      />
    )

    const transitionProps = {
      visible: transitionVisible,
      transitionOnMount: false,
      animation: 'fade',
      duration: 200,
      mountOnShow: false
    }

    const albumTitle = info.title
    const artistName = info.artist
    const transitionText = (
      <div>
        <Header
          as="h3"
          textAlign="center"
          className="albumPageLeftColumnText"
          content={albumTitle}
        />
        <Header
          as="h4"
          textAlign="center"
          className="albumPageLeftColumnText"
          content={artistName}
        />
      </div>
    )

    const transitionData = (
      <Transition {...transitionProps}>{transitionText}</Transition>
    )

    const leftColumnData = (
      <div className="albumPageLeftColumn">
        {coverData}

        {transitionData}
      </div>
    )

    const albumTitleData = (
      <Header as="h2" className="albumPageAlbumTitle" content={albumTitle} />
    )

    const { params } = this.props.match
    const artistPageLink = `/artists/${params.artistName}`
    const artistNameData = (
      <Header className="albumPageArtistName">
        <Link to={artistPageLink}>{artistName}</Link>
      </Header>
    )

    const listenersCount = info.listeners_count.toLocaleString('eu')
    const playsCount = info.plays_count.toLocaleString('eu')
    const countersData = (
      <Label.Group size="large">
        <Label basic icon="user" content={listenersCount} />
        <Label basic icon="music" content={playsCount} />
      </Label.Group>
    )

    const tagData = tag => (
      <Label key={uuid()} as={Link} to={`/tags/${tag}`} content={tag} />
    )
    const tagsList = tags.map(tagData)
    const tagsData = (
      <Router>
        <Label.Group size="large">
          {tagsList}

          {tags.length > 0 && <Label as="a" content="..." />}
        </Label.Group>
      </Router>
    )

    const descriptionData = (
      <div className="albumPageDescription">
        {description || 'No description.'}
      </div>
    )

    const trackData = (track, index) => (
      <Track key={uuid()} index={index} {...{ track, artistName }} />
    )
    const tracksList = tracks.map(trackData)
    const tracksData = tracks && (
      <Router>
        <List selection content={tracksList} />
      </Router>
    )

    const rightColumnData = (
      <div className="albumPageRightColumn">
        {albumTitleData}

        {artistNameData}

        {countersData}

        {tagsData}

        <Divider />

        {descriptionData}

        <Divider />

        {tracksData}
      </div>
    )

    return (
      <Segment className="albumPage">
        {leftColumnData}

        {rightColumnData}
      </Segment>
    )
  }

  render () {
    const { loading, info, error } = this.state

    const loader = loading && (
      <Dimmer active inverted className="fixed" content={<Loader inverted />} />
    )

    const successData = info && (
      <React.Fragment>{this.pageData()}</React.Fragment>
    )

    const errorData = error && <ErrorData {...{ error }} />

    const pageData = loader || successData || errorData

    return <React.Fragment>{pageData}</React.Fragment>
  }
}
