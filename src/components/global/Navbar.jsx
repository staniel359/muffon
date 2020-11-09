import React from 'react'
import { Menu, Container, Breadcrumb } from 'semantic-ui-react'

export default class Navbar extends React.PureComponent {
  render () {
    const { navSections } = this.props

    return (
      <Menu borderless className="fixed mainMenu">
        <Container>
          <Menu.Item>
            <Breadcrumb
              size="large"
              icon="right angle"
              sections={navSections}
            />
          </Menu.Item>
        </Container>
      </Menu>
    )
  }
}
