import React from 'react'
import { Menu } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'

export default class PageMenu extends React.PureComponent {
  menuItemNames = ['info', 'tracks', 'albums', 'similar']

  menuItem = name => {
    const { menuActiveItem } = this.props

    return {
      key: uuid(),
      name: name,
      active: menuActiveItem === name,
      onClick: this.scrollToSegmentTop
    }
  }

  scrollToSegmentTop = (_, { name }) => {
    this.props.scrollToSegmentTop(name)
  }

  render () {
    const menuItemsList = this.menuItemNames.map(this.menuItem)

    return (
      <Menu
        pointing
        secondary
        vertical
        inverted
        className="artistPageLeftColumnMenu"
        size="large"
        items={menuItemsList}
      />
    )
  }
}
