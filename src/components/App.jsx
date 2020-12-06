import React from 'react'
import Routes from './Routes'
import Search from 'global/Search'
import Navbar from 'global/Navbar'
import PlayerPanelContextWrap from 'global/player/PanelContextWrap'
import PlayerProvider from 'contexts/PlayerProvider'
import Mousetrap from 'mousetrap'
import { Container } from 'semantic-ui-react'
import { HashRouter as Router } from 'react-router-dom'
import 'styles/App.sass'

export default class App extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { navSections: [], isSearchActive: false }
  }

  componentDidMount () {
    Mousetrap.bind('ctrl+f', this.toggleSearch)
    Mousetrap.bind('esc', this.hideSearch)
  }

  toggleSearch = () => {
    const isSearchActive = !this.state.isSearchActive

    this.setState({ ...{ isSearchActive } })
  }

  hideSearch = () => this.setState({ isSearchActive: false })

  setNavSections = navSections => this.setState({ ...{ navSections } })

  render () {
    const { navSections, isSearchActive } = this.state
    const { setNavSections, hideSearch } = this

    const navbarProps = { navSections }
    const routesProps = { setNavSections }
    const searchProps = { isSearchActive, hideSearch }

    return (
      <Router>
        <PlayerProvider>
          <Navbar {...navbarProps} />

          <Container id="mainContainer">
            <Routes {...routesProps} />

            <Search {...searchProps} />
          </Container>

          <PlayerPanelContextWrap />
        </PlayerProvider>
      </Router>
    )
  }
}
