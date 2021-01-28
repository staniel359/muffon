import React from 'react'
import { Menu, Container, Breadcrumb, Button } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import { createBrowserHistory } from 'history'

export default class Navbar extends React.PureComponent {
  constructor (props) {
    super(props)

    this.history = createBrowserHistory()
  }

  backwardButtonData () {
    return (
      <Menu.Item fitted>
        <Button
          basic
          className="navbarHistoryButton"
          icon="arrow left"
          onClick={this.history.goBack}
        />
      </Menu.Item>
    )
  }

  contentData () {
    const { navSections } = this.props

    const sectionData = section => ({ key: uuid(), ...section })
    const sectionsData = navSections.map(sectionData)

    return (
      <Menu.Item className="navbarContentWrap">
        <Breadcrumb
          className="navbarContent"
          size="large"
          icon="right angle"
          sections={sectionsData}
        />
      </Menu.Item>
    )
  }

  forwardButtonData () {
    return (
      <Menu.Item fitted>
        <Button
          basic
          className="navbarHistoryButton"
          icon="arrow right"
          onClick={this.history.goForward}
        />
      </Menu.Item>
    )
  }

  render () {
    return (
      <Menu borderless fixed="top" id="navbar">
        <Container>
          {this.backwardButtonData()}
          {this.contentData()}
          {this.forwardButtonData()}
        </Container>
      </Menu>
    )
  }
}
