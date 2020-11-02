import React from 'react'
import Artists from './tabs/Artists'
import Albums from './tabs/Albums'
import Tracks from './tabs/Tracks'
import { Segment, Tab } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'

export default class Results extends React.Component {
  tabsData () {
    return (
      <Segment attached="bottom" className="searchResultsWrap">
        <Tab
          menu={this.tabMenu}
          panes={this.tabPanesData()}
          renderActiveOnly={false}
        />
      </Segment>
    )
  }

  tabMenu = { fluid: true, pointing: true, secondary: true }

  tabPanesData () {
    return this.tabPanes.map(data => {
      return { menuItem: data[0], pane: data[1] }
    })
  }

  tabPanes = [
    ['Artists', <Artists key={uuid()} {...this.paneProps()} />],
    ['Albums', <Albums key={uuid()} {...this.paneProps()} />],
    ['Tracks', <Tracks key={uuid()} {...this.paneProps()} />]
  ]

  paneProps () {
    const { query, hideSearch } = this.props
    const { scrollTabToTop } = this

    return { query, hideSearch, scrollTabToTop }
  }

  scrollTabToTop () {
    document.querySelectorAll('.searchTabWrap').forEach(e => (e.scrollTop = 0))
  }

  render () {
    return this.tabsData()
  }
}
