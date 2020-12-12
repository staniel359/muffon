import React from 'react'
import Artists from './tabs/Artists'
import Albums from './tabs/Albums'
import Tracks from './tabs/Tracks'
import { Tab } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'

export default class Tabs extends React.PureComponent {
  render () {
    const { query, hideSearch } = this.props

    const tabMenu = { fluid: true, pointing: true, secondary: true }

    const artistsRef = React.createRef()
    const albumsRef = React.createRef()
    const tracksRef = React.createRef()

    const scrollToTop = tabName => {
      const refs = { artistsRef, albumsRef, tracksRef }
      const tab = refs[`${tabName}Ref`].current

      tab && (tab.scrollTop = 0)
    }

    const tabPaneProps = { query, hideSearch, scrollToTop }

    const artistsProps = { key: uuid(), artistsRef, ...tabPaneProps }
    const albumsProps = { key: uuid(), albumsRef, ...tabPaneProps }
    const tracksProps = { key: uuid(), tracksRef, ...tabPaneProps }

    const tabPanesData = [
      { menuItem: 'Artists', pane: <Artists {...artistsProps} /> },
      { menuItem: 'Albums', pane: <Albums {...albumsProps} /> },
      { menuItem: 'Tracks', pane: <Tracks {...tracksProps} /> }
    ]

    return (
      <Tab
        className="searchResults"
        menu={tabMenu}
        panes={tabPanesData}
        renderActiveOnly={false}
      />
    )
  }
}
