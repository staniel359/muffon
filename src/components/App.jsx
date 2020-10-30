import React from 'react'
import GlobalSearch from './global/Search'
import Routes from './Routes'
import Mousetrap from 'mousetrap'
import { Menu, Container, Breadcrumb } from 'semantic-ui-react'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      navSections: []
    }
  }

  componentDidMount () {
    Mousetrap.bind('ctrl+f', () => this.toggleGlobalSearch())
    Mousetrap.bind('esc', () => this.hideGlobalSearch())
  }

  toggleGlobalSearch = () => {
    this.setState({ globalSearch: !this.state.globalSearch })
  }

  hideGlobalSearch = () => {
    this.setState({ globalSearch: false })
  }

  menu () {
    return (
      <Menu borderless className="fixed mainMenu">
        <Container>
          <Menu.Item>
            <Breadcrumb
              size="large"
              icon="right angle"
              sections={this.state.navSections}
            />
          </Menu.Item>
        </Container>
      </Menu>
    )
  }

  setNavSections = navSections => {
    this.setState({ navSections: navSections })
  }

  globalSearchDimmer () {
    return (
      this.state.globalSearch && (
        <GlobalSearch hideGlobalSearch={this.hideGlobalSearch} />
      )
    )
  }

  render () {
    return (
      <React.Fragment>
        {this.menu()}

        <Container className="mainContainer">
          <Routes setNavSections={this.setNavSections} />

          {this.globalSearchDimmer()}
        </Container>
      </React.Fragment>
    )
  }
}
