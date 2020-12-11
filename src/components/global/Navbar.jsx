import React from 'react'
import { Menu, Container, Breadcrumb, Button } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import { createBrowserHistory } from 'history'

export default class Navbar extends React.PureComponent {
  render () {
    const { navSections } = this.props

    const history = createBrowserHistory()
    const backButtonData = (
      <Menu.Item fitted>
        <Button
          basic
          className="navbarHistoryButton"
          icon="arrow left"
          onClick={history.goBack}
        />
      </Menu.Item>
    )

    const sectionWithKey = section => ({ ...section, key: uuid() })
    const sections = navSections.map(sectionWithKey)
    const contentData = (
      <Menu.Item className="navbarContentWrap">
        <Breadcrumb
          className="navbarContent"
          size="large"
          icon="right angle"
          {...{ sections }}
        />
      </Menu.Item>
    )

    const forwardButtonData = (
      <Menu.Item fitted>
        <Button
          basic
          className="navbarHistoryButton"
          icon="arrow right"
          onClick={history.goForward}
        />
      </Menu.Item>
    )

    return (
      <Menu borderless fixed="top" id="navbar">
        <Container>
          {backButtonData}
          {contentData}
          {forwardButtonData}
        </Container>
      </Menu>
    )
  }
}
