import React from 'react'
import Routes from './Routes'
import Search from 'global/Search'
import Navbar from 'global/Navbar'
import PlayerPanel from 'global/player/Panel'
import PlayerProvider from 'contexts/PlayerProvider'
import Mousetrap from 'mousetrap'
import { Container } from 'semantic-ui-react'
import 'styles/App.sass'

export default class App extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { navSections: [] }
  }

  componentDidMount () {
    Mousetrap.bind('ctrl+f', this.toggleSearch)
    Mousetrap.bind('esc', this.hideSearch)
  }

  toggleSearch = () => {
    this.setState({ search: !this.state.search })
  }

  hideSearch = () => {
    this.setState({ search: false })
  }

  setNavSections = navSections => {
    this.setState({ navSections: navSections })
  }

  render () {
    const { navSections, search } = this.state
    const { setNavSections, hideSearch } = this

    return (
      <PlayerProvider>
        {<Navbar {...{ navSections }} />}

        <Container className="mainContainer">
          {<Routes {...{ setNavSections }} />}

          {search && <Search {...{ hideSearch }} />}
        </Container>

        <PlayerPanel />
      </PlayerProvider>
    )
  }
}
