import React from 'react'
import Artists from './tabs/Artists'
import Albums from './tabs/Albums'
import Tracks from './tabs/Tracks'
import { Segment, Tab } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'

export default class Results extends React.PureComponent {
  tabPaneData = data => {
    return { menuItem: data[0], pane: data[1] }
  }

  render () {
    const { query, hideSearch } = this.props

    const tabMenu = { fluid: true, pointing: true, secondary: true }

    const tabPaneProps = { query, hideSearch }
    const tabPanes = [
      ['Artists', <Artists key={uuid()} {...tabPaneProps} />],
      ['Albums', <Albums key={uuid()} {...tabPaneProps} />],
      ['Tracks', <Tracks key={uuid()} {...tabPaneProps} />]
    ]
    const tabPanesData = tabPanes.map(this.tabPaneData)

    return (
      <Segment attached="bottom" className="searchResultsWrap">
        <Tab menu={tabMenu} panes={tabPanesData} renderActiveOnly={false} />
      </Segment>
    )
  }
}
