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

    const refs = { artistsRef, albumsRef, tracksRef }

    const tab = name => refs[`${name}Ref`]
    const scrollToTop = name => (tab(name).current.scrollTop = 0)

    const tabPaneProps = { query, hideSearch, scrollToTop }

    const artistsData = () => {
      const key = uuid()
      const artistsProps = { ...tabPaneProps, artistsRef, key }

      return <Artists {...artistsProps} />
    }

    const albumsData = () => {
      const key = uuid()
      const albumsProps = { ...tabPaneProps, albumsRef, key }

      return <Albums {...albumsProps} />
    }

    const tracksData = () => {
      const key = uuid()
      const tracksProps = { ...tabPaneProps, tracksRef, key }

      return <Tracks {...tracksProps} />
    }

    const tabPanes = [
      ['Artists', artistsData()],
      ['Albums', albumsData()],
      ['Tracks', tracksData()]
    ]

    const tabPaneData = data => {
      const [menuItem, pane] = data

      return { ...{ menuItem, pane } }
    }

    const tabPanesData = tabPanes.map(tabPaneData)

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
