import React from 'react'
import { Menu, Container, Breadcrumb } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'

export default class Navbar extends React.PureComponent {
  render () {
    const { navSections } = this.props

    const sectionWithKey = section => ({ ...section, key: uuid() })
    const sections = navSections.map(sectionWithKey)

    return (
      <Menu borderless className="fixed" id="mainMenu">
        <Container>
          <Menu.Item>
            <Breadcrumb size="large" icon="right angle" {...{ sections }} />
          </Menu.Item>
        </Container>
      </Menu>
    )
  }
}
