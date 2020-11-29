import React from 'react'
import { Menu, Container, Breadcrumb } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'

export default class Navbar extends React.PureComponent {
  render () {
    const addKeyToSection = section => ({...section, ...{ key: uuid() }})
    const sections = this.props.navSections.map(addKeyToSection)

    return (
      <Menu borderless className="fixed mainMenu">
        <Container>
          <Menu.Item>
            <Breadcrumb size="large" icon="right angle" {...{ sections }} />
          </Menu.Item>
        </Container>
      </Menu>
    )
  }
}
