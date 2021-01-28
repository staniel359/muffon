import React from 'react'
import { v4 as uuid } from 'uuid'
import { Menu } from 'semantic-ui-react'

export default class PageMenu extends React.PureComponent {
  menuItemData = menuItemName => {
    const { menuActiveItem, scrollToTop } = this.props

    const isActive = menuItemName === menuActiveItem
    const handleClick = () => scrollToTop(menuItemName)

    return {
      key: uuid(),
      name: menuItemName,
      active: isActive,
      onClick: handleClick
    }
  }

  render () {
    const menuItems = ['info', 'tracks', 'albums', 'similar']
    const menuItemsData = menuItems.map(this.menuItemData)

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
