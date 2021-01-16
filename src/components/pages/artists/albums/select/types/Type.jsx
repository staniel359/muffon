import React from 'react'
import { Dropdown } from 'semantic-ui-react'

export default class Type extends React.PureComponent {
  render () {
    const { type, isDisabled, isSelected, setSelectedType } = this.props

    const handleClick = () => setSelectedType(type)

    return (
      <Dropdown.Item
        text={type.name}
        disabled={isDisabled}
        active={isSelected}
        selected={isSelected}
        onClick={handleClick}
      />
    )
  }
}
