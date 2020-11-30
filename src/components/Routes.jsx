import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Home'
import ArtistShow from './artists/Show'
import ArtistTracks from './artists/Tracks'
import TrackShow from './artists/tracks/Show'
import TrackTags from './artists/tracks/Tags'
import ArtistAlbums from './artists/Albums'
import AlbumShow from './artists/albums/Show'
import AlbumTags from './artists/albums/Tags'
import ArtistSimilar from './artists/Similar'
import ArtistTags from './artists/Tags'
import TagShow from './tags/Show'
import { v4 as uuid } from 'uuid'

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
    const artistAlbums = props => <ArtistAlbums {...pageProps(props)} />
    const albumShow = props => <AlbumShow {...pageProps(props)} />
    const albumTags = props => <AlbumTags {...pageProps(props)} />
    const artistSimilar = props => <ArtistSimilar {...pageProps(props)} />
    const artistTags = props => <ArtistTags {...pageProps(props)} />
    const tagShow = props => <TagShow {...pageProps(props)} />

    const routes = [
      ['/', home],
      ['/artists/:artistName', artistShow],
      ['/artists/:artistName/tracks', artistTracks],
      ['/artists/:artistName/tracks/:trackTitle', trackShow],
      ['/artists/:artistName/tracks/:trackTitle/tags', trackTags],
      ['/artists/:artistName/albums/', artistAlbums],
      ['/artists/:artistName/albums/:albumTitle', albumShow],
      ['/artists/:artistName/albums/:albumTitle/tags', albumTags],
      ['/artists/:artistName/similar', artistSimilar],
      ['/artists/:artistName/tags', artistTags],
      ['/tags/:tagName', tagShow]
    ]

    const routeData = route => {
      const [path, render] = route
      const key = uuid()
      const routeProps = { path, render, key }

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
