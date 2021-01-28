import React from 'react'
import { v4 as uuid } from 'uuid'
import { Tab } from 'semantic-ui-react'
import Artists from './tabs/Artists'
import Albums from './tabs/Albums'
import Tracks from './tabs/Tracks'

export default class Tabs extends React.PureComponent {
  constructor (props) {
    super(props)

    this.artistsRef = React.createRef()
    this.albumsRef = React.createRef()
    this.tracksRef = React.createRef()
  }

  tabPanesData () {
    const { query, hideSearch } = this.props

    const ref = refName => this[`${refName}Ref`]

    const scrollToTop = tabName => {
      const tab = ref(tabName).current

      !!tab && (tab.scrollTop = 0)
    }

    const tabPaneProps = tabName => ({
      key: uuid(),
      tabRef: ref(tabName),
      query,
      hideSearch,
      scrollToTop
    })

    return [
      {
        menuItem: 'Artists',
        pane: <Artists {...tabPaneProps('artists')} />
      },
      {
        menuItem: 'Albums',
        pane: <Albums {...tabPaneProps('albums')} />
      },
      {
        menuItem: 'Tracks',
        pane: <Tracks {...tabPaneProps('tracks')} />
      }
    ]
  }

  render () {
    const tabMenuData = { fluid: true, pointing: true, secondary: true }

    return (
      <Tab
        className="searchResults"
        menu={tabMenuData}
        panes={this.tabPanesData()}
        renderActiveOnly={false}
      />
    )
  }
}
