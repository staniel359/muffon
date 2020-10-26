import React from 'react'
import GlobalSearch from './global/Search'
import Routes from './Routes'
import { HashRouter as Router } from 'react-router-dom'
import Mousetrap from 'mousetrap'
import { Menu, Container, Breadcrumb } from 'semantic-ui-react'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
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
      <Menu borderless className="fixed">
        <Container>
          <Menu.Item>
            <Breadcrumb
              size="large"
              icon="right angle"
              sections={this.breadcrumbSections()}
            />
          </Menu.Item>
        </Container>
      </Menu>
    )
  }

  breadcrumbSections () {
    return [
      {
        key: 'Artists',
        content: 'Artists',
        link: false
      },
      {
        key: 'test',
        content: 'test',
        link: false,
        active: true
      }
    ]
  }

  globalSearchDimmer () {
    return <GlobalSearch hideGlobalSearch={this.hideGlobalSearch} />
  }

  render () {
    return (
      <React.Fragment>
        {this.menu()}

        <div className="ui container mainContainer">
          <Router>
            <Routes />

            {this.state.globalSearch && this.globalSearchDimmer()}
          </Router>
        </div>
      </React.Fragment>
    )
  }
}
