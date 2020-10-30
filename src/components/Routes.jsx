import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Home'
import { Show as ArtistShow } from './artists/Show'
import { Show as AlbumShow } from './artists/albums/Show'
import { Show as TrackShow } from './artists/tracks/Show'
import { Show as TagShow } from './tags/Show'
import { v4 as uuid } from 'uuid'

export default class Routes extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return nextState !== this.state
  }

  render () {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/artists/:artistName"
            render={props => (
              <ArtistShow
                {...props}
                setNavSections={this.props.setNavSections}
                key={uuid()}
              />
            )}
          />
          <Route
            path="/artists/:artistName/albums/:albumTitle"
            render={props => (
              <AlbumShow
                {...props}
                setNavSections={this.props.setNavSections}
                key={uuid()}
              />
            )}
          />
          <Route
            path="/artists/:artistName/tracks/:trackTitle"
            render={props => (
              <TrackShow
                {...props}
                setNavSections={this.props.setNavSections}
                key={uuid()}
              />
            )}
          />
          <Route
            path="/tags/:tagName"
            render={props => (
              <TagShow
                {...props}
                setNavSections={this.props.setNavSections}
                key={uuid()}
              />
            )}
          />
          <Route
            path="/"
            render={props => (
              <Home
                {...props}
                setNavSections={this.props.setNavSections}
                key={uuid()}
              />
            )}
          />
        </Switch>
      </Router>
    )
  }
}
