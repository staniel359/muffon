import React from 'react'
import Artists from './tabs/Artists'
import Albums from './tabs/Albums'
import Tracks from './tabs/Tracks'
import { Segment, Tab, Message } from 'semantic-ui-react'

export default class Tabs extends React.PureComponent {
  tabPanes () {
    return [
      {
        menuItem: 'Artists',
        render: () => this.searchResultsArtists()
      },
      {
        menuItem: 'Albums',
        render: () => this.searchResultsAlbums()
      },
      {
        menuItem: 'Tracks',
        render: () => this.searchResultsTracks()
      }
    ]
  }

  searchResultsArtists () {
    const { artists, artistsLoaded, hideGlobalSearch } = this.props
    return (
      <Tab.Pane
        className="globalSearchTabWrap"
        loading={!this.props.artistsLoaded}
      >
        <Artists
          {...{ artists, artistsLoaded, hideGlobalSearch }}
          error={this.errorData(this.props.artistsError)}
        />
      </Tab.Pane>
    )
  }

  searchResultsAlbums () {
    const { albums, albumsLoaded, hideGlobalSearch } = this.props
    return (
      <Tab.Pane
        className="globalSearchTabWrap"
        loading={!this.props.albumsLoaded}
      >
        <Albums
          {...{ albums, albumsLoaded, hideGlobalSearch }}
          error={this.errorData(this.props.albumsError)}
        />
      </Tab.Pane>
    )
  }

  searchResultsTracks () {
    const { tracks, tracksLoaded, hideGlobalSearch } = this.props
    return (
      <Tab.Pane
        className="globalSearchTabWrap"
        loading={!this.props.tracksLoaded}
      >
        <Tracks
          {...{ tracks, tracksLoaded, hideGlobalSearch }}
          error={this.errorData(this.props.tracksError)}
        />
      </Tab.Pane>
    )
  }

  errorData (error) {
    return error === 404 ? this.notFoundError() : this.serverError()
  }

  notFoundError () {
    return (
      <Message
        icon="search"
        header="Not Found"
        content="Try searching something else."
      />
    )
  }

  serverError () {
    return (
      <Message
        icon="exclamation triangle"
        header="Something went wrong"
        content="Please try again in a moment."
        warning
      />
    )
  }

  render () {
    return (
      <Segment attached="bottom" className="globalSearchResultsWrap">
        <Tab
          menu={{ fluid: true, pointing: true, secondary: true }}
          panes={this.tabPanes()}
        />
      </Segment>
    )
  }
}
