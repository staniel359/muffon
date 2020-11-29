import React from 'react'
import Routes from './Routes'
import Search from 'global/Search'
import Navbar from 'global/Navbar'
import PlayerPanel from 'global/player/Panel'
import PlayerProvider from 'contexts/PlayerProvider'
import PlayerContext from 'contexts/PlayerContext'
import Mousetrap from 'mousetrap'
import { Container } from 'semantic-ui-react'
import { HashRouter as Router } from 'react-router-dom'
import 'styles/App.sass'

export default class App extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { navSections: [], searchActive: false }
  }

  componentDidMount () {
    Mousetrap.bind('ctrl+f', this.toggleSearch)
    Mousetrap.bind('esc', this.hideSearch)
  }

  toggleSearch = () => this.setState({ searchActive: !this.state.searchActive })

  hideSearch = () => this.setState({ searchActive: false })

  setNavSections = navSections => {
    this.setState({ navSections: navSections })
  }

  render () {
    const { navSections, searchActive } = this.state
    const { setNavSections, hideSearch } = this

    const navbarData = <Navbar {...{ navSections }} />

    const mainContainerData = (
      <Container className="mainContainer">
        {<Routes {...{ setNavSections }} />}

        {<Search {...{ searchActive, hideSearch }} />}
      </Container>
    )

    const playerPanelData = (
      <PlayerContext.Consumer>
        {context => {
          const { currentTrack } = context

          return <PlayerPanel {...{ currentTrack }} />
        }}
      </PlayerContext.Consumer>
    )

    return (
      <Router>
        <PlayerProvider>
          {navbarData}
          {mainContainerData}
          {playerPanelData}
        </PlayerProvider>
      </Router>
    )
  }
}
