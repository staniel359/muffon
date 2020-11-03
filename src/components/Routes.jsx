import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Home'
import ArtistShow from './artists/Show'
import AlbumShow from './artists/albums/Show'
import TrackShow from './artists/tracks/Show'
import TagShow from './tags/Show'
import { v4 as uuid } from 'uuid'

export default class Routes extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return nextState !== this.state
  }

  render () {
    const setNavSections = this.props.setNavSections
    const extraProps = { setNavSections }

    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/artists/:artistName"
            render={props => (
              <ArtistShow key={uuid()} {...props} {...extraProps} />
            )}
          />
          <Route
            path="/artists/:artistName/albums/:albumTitle"
            render={props => (
              <AlbumShow key={uuid()} {...props} {...extraProps} />
            )}
          />
          <Route
            path="/artists/:artistName/tracks/:trackTitle"
            render={props => (
              <TrackShow key={uuid()} {...props} {...extraProps} />
            )}
          />
          <Route
            path="/tags/:tagName"
            render={props => (
              <TagShow key={uuid()} {...props} {...extraProps} />
            )}
          />
          <Route
            path="/"
            render={props => <Home {...props} {...extraProps} />}
          />
        </Switch>
      </Router>
    )
  }
}
