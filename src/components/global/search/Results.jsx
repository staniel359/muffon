import React from 'react'
import Artists from './tabs/Artists'
import Albums from './tabs/Albums'
import Tracks from './tabs/Tracks'
import { Segment, Tab } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'

export default class Results extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  tabMenu () {
    return {
      fluid: true,
      pointing: true,
      secondary: true
    }
  }

  tabPanes () {
    return [
      { menuItem: 'Artists', pane: this.artistsTab() },
      { menuItem: 'Albums', pane: this.albumsTab() },
      { menuItem: 'Tracks', pane: this.tracksTab() }
    ]
  }

  artistsTab () {
    const { query, hideGlobalSearch } = this.props
    const { encode } = this
    return <Artists key={uuid()} {...{ query, hideGlobalSearch, encode }} />
  }

  encode = string => {
    return encodeURIComponent(string)
  }

  albumsTab () {
    const { query, hideGlobalSearch } = this.props
    const { encode, scrollTabToTop } = this
    return (
      <Albums
        key={uuid()}
        {...{ query, hideGlobalSearch, encode, scrollTabToTop }}
      />
    )
  }

  scrollTabToTop = () => {
    document
      .querySelectorAll('.globalSearchTabWrap')
      .forEach(e => (e.scrollTop = 0))
  }

  tracksTab () {
    const { query, hideGlobalSearch } = this.props
    const { encode, scrollTabToTop } = this
    return (
      <Tracks
        key={uuid()}
        {...{ query, hideGlobalSearch, encode, scrollTabToTop }}
      />
    )
  }

  render () {
    return (
      <Segment attached="bottom" className="globalSearchResultsWrap">
        <Tab
          menu={this.tabMenu()}
          panes={this.tabPanes()}
          renderActiveOnly={false}
        />
      </Segment>
    )
  }
}
