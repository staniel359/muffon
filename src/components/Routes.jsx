import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Home'
import ArtistShow from './artists/Show'
import AlbumShow from './artists/albums/Show'
import TrackShow from './artists/tracks/Show'
import TagShow from './tags/Show'
import { v4 as uuid } from 'uuid'

export default class Routes extends React.PureComponent {
  render () {
    const { setNavSections } = this.props
    const extraProps = { setNavSections }

    const artistShow = props => (
      <ArtistShow key={uuid()} {...props} {...extraProps} />
    )
    const albumShow = props => (
      <AlbumShow key={uuid()} {...props} {...extraProps} />
    )
    const trackShow = props => (
      <TrackShow key={uuid()} {...props} {...extraProps} />
    )
    const tagShow = props => <TagShow key={uuid()} {...props} {...extraProps} />
    const home = props => <Home {...props} {...extraProps} />

    return (
      <Router>
        <Switch>
          <Route exact path="/artists/:artistName" render={artistShow} />
          <Route
            path="/artists/:artistName/albums/:albumTitle"
            render={albumShow}
          />
          <Route
            path="/artists/:artistName/tracks/:trackTitle"
            render={trackShow}
          />
          <Route path="/tags/:tagName" render={tagShow} />
          <Route path="/" render={home} />
        </Switch>
      </Router>
    )
  }
}
