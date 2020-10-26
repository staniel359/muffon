import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { Show as ArtistShow } from './artists/Show'
import { v4 as uuid } from 'uuid'

export default class Routes extends React.PureComponent {
  render () {
    return (
      <Router>
        <Switch>
          <Route
            path="/artists/:artistName/albums/:albumTitle"
            component={AlbumShow}
          />
          <Route
            path="/artists/:artistName/tracks/:trackTitle"
            component={TrackShow}
          />
          <Route
            path="/artists/:artistName"
            render={props => <ArtistShow {...props} key={uuid()} />}
          />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    )
  }
}

function Home () {
  return 'Home'
}

function AlbumShow () {
  return 'album'
}

function TrackShow () {
  return 'track'
}
