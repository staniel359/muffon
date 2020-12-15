import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import Home from './pages/Home'
import ArtistShow from './pages/artists/Show'
import ArtistTracks from './pages/artists/Tracks'
import TrackShow from './pages/artists/tracks/Show'
import TrackTags from './pages/artists/tracks/Tags'
import TrackSimilar from './pages/artists/tracks/Similar'
import ArtistAlbums from './pages/artists/Albums'
import AlbumShow from './pages/artists/albums/Show'
import AlbumTags from './pages/artists/albums/Tags'
import ArtistSimilar from './pages/artists/Similar'
import ArtistTags from './pages/artists/Tags'
import ArtistImages from './pages/artists/Images'
import TagShow from './pages/tags/Show'
import TagArtists from './pages/tags/Artists'
import TagAlbums from './pages/tags/Albums'
import TagTracks from './pages/tags/Tracks'

export default class Routes extends React.PureComponent {
  render () {
    const { setNavSections } = this.props

    const extraProps = { setNavSections }
    const pageProps = props => ({ ...props, ...extraProps })

    const home = props => <Home {...pageProps(props)} />
    const artistShow = props => <ArtistShow {...pageProps(props)} />
    const artistTracks = props => <ArtistTracks {...pageProps(props)} />
    const trackShow = props => <TrackShow {...pageProps(props)} />
    const trackTags = props => <TrackTags {...pageProps(props)} />
    const trackSimilar = props => <TrackSimilar {...pageProps(props)} />
    const artistAlbums = props => <ArtistAlbums {...pageProps(props)} />
    const albumShow = props => <AlbumShow {...pageProps(props)} />
    const albumTags = props => <AlbumTags {...pageProps(props)} />
    const artistSimilar = props => <ArtistSimilar {...pageProps(props)} />
    const artistTags = props => <ArtistTags {...pageProps(props)} />
    const artistImages = props => <ArtistImages {...pageProps(props)} />
    const tagShow = props => <TagShow {...pageProps(props)} />
    const tagArtists = props => <TagArtists {...pageProps(props)} />
    const tagAlbums = props => <TagAlbums {...pageProps(props)} />
    const tagTracks = props => <TagTracks {...pageProps(props)} />

    const routes = [
      ['/', home],
      ['/artists/:artistName', artistShow],
      ['/artists/:artistName/tracks', artistTracks],
      ['/artists/:artistName/tracks/:trackTitle', trackShow],
      ['/artists/:artistName/tracks/:trackTitle/tags', trackTags],
      ['/artists/:artistName/tracks/:trackTitle/similar', trackSimilar],
      ['/artists/:artistName/albums/', artistAlbums],
      ['/artists/:artistName/albums/:albumTitle', albumShow],
      ['/artists/:artistName/albums/:albumTitle/tags', albumTags],
      ['/artists/:artistName/similar', artistSimilar],
      ['/artists/:artistName/tags', artistTags],
      ['/artists/:artistName/images', artistImages],
      ['/tags/:tagName', tagShow],
      ['/tags/:tagName/artists', tagArtists],
      ['/tags/:tagName/albums', tagAlbums],
      ['/tags/:tagName/tracks', tagTracks]
    ]

    const routeData = route => {
      const [path, render] = route
      const routeProps = { path, render, key: uuid() }

      return <Route exact {...routeProps} />
    }

    const routesData = routes.map(routeData)

    return (
      <Router>
        <Switch>{routesData}</Switch>
      </Router>
    )
  }
}
