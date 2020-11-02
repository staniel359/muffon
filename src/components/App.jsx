import React from 'react'
import Routes from './Routes'
import Search from './global/Search'
import PlayerPanel from './global/player/Panel'
import Mousetrap from 'mousetrap'
import { Menu, Container, Breadcrumb } from 'semantic-ui-react'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
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

  menu () {
    return (
      <Menu borderless className="fixed mainMenu">
        <Container>
          <Menu.Item>
            <Breadcrumb
              size="large"
              icon="right angle"
              sections={this.state.navSections || []}
            />
          </Menu.Item>
        </Container>
      </Menu>
    )
  }

  setNavSections = navSections => {
    this.setState({ navSections: navSections })
  }

  render () {
    return (
      <React.Fragment>
        {this.menu()}

        <Container className="mainContainer">
          <Routes setNavSections={this.setNavSections} />

          {this.state.search && <Search hideSearch={this.hideSearch} />}
        </Container>

        <PlayerPanel />
      </React.Fragment>
    )
  }
}
