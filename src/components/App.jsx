import React from 'react'
import Routes from './Routes'
import { HashRouter as Router } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import Mousetrap from 'mousetrap'
import PlayerProvider from 'contexts/PlayerProvider'
import PlayerPanelContext from 'global/PlayerPanelContext'
import TitleContext from 'global/TitleContext'
import QueuePanelContext from 'global/QueuePanelContext'
import Navbar from 'global/Navbar'
import Search from 'global/Search'
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
    const { isSearchActive } = this.state

    this.setState({ isSearchActive: !isSearchActive })
  }

  hideSearch = () => this.setState({ isSearchActive: false })

  navbarData () {
    const { navSections } = this.state

    const navbarProps = { navSections }

    return <Navbar {...navbarProps} />
  }

  routesData () {
    const { setNavSections } = this

    const routesProps = { setNavSections }

    return <Routes {...routesProps} />
  }

  setNavSections = navSections => this.setState({ navSections })

  searchData () {
    const { isSearchActive } = this.state
    const { hideSearch } = this

    const searchProps = { isSearchActive, hideSearch }

    return <Search {...searchProps} />
  }

  render () {
    return (
      <Router>
        <PlayerProvider>
          <TitleContext />

          {this.navbarData()}

          <Container id="mainContainer">
            {this.routesData()}

            {this.searchData()}
          </Container>

          <QueuePanelContext />

          <PlayerPanelContext />
        </PlayerProvider>
      </Router>
    )
  }
}
