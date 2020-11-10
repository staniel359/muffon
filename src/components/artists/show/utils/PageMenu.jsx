import React from 'react'
import { Menu } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'

export default class PageMenu extends React.PureComponent {
  render () {
    const { menuActiveItem, scrollToSegmentTop } = this.props

    const menuItemNames = ['info', 'tracks', 'albums', 'similar']

    const handleClick = (_, { name }) => scrollToSegmentTop(name)
    const menuItem = name => {
      return {
        key: uuid(),
        name: name,
        active: menuActiveItem === name,
        onClick: handleClick
      }
    }

    const menuItemsList = menuItemNames.map(menuItem)

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
