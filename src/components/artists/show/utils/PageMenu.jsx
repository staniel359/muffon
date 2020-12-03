import React from 'react'
import { Menu } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'

export default class PageMenu extends React.PureComponent {
  render () {
    const { menuActiveItem, scrollToTop } = this.props

    const menuItems = ['info', 'tracks', 'albums', 'similar']

    const handleClick = (_, { name }) => scrollToTop(name)
    const menuItemData = name => ({
      key: uuid(),
      name: name,
      active: menuActiveItem === name,
      onClick: handleClick
    })

    const menuItemsData = menuItems.map(menuItemData)

    return (
      <Menu
        pointing
        secondary
        vertical
        inverted
        className="artistPageLeftColumnMenu"
        size="large"
        items={menuItemsData}
      />
    )
  }
}
