import React from 'react'
import { Dropdown } from 'semantic-ui-react'

export default class Types extends React.PureComponent {
  textData () {
    const { selectedType } = this.props

    return selectedType ? selectedType.name : 'Select type'
  }

  typesData () {
    const { types } = this.props

    return types.map(this.typeData)
  }

  typeData = type => {
    const { data, selectedType, setSelectedType } = this.props

    const typeData = data[type.id]
    const isDisabled = !typeData || typeData.length === 0
    const isSelected = !!selectedType && selectedType.id === type.id
    const handleClick = () => setSelectedType(type)

    return {
      key: type.id,
      text: type.name,
      disabled: isDisabled,
      active: isSelected,
      selected: isSelected,
      onClick: handleClick
    }
  }

  render () {
    return (
      <Dropdown
        button
        fluid
        selection
        className="albumSourceSelect"
        text={this.textData()}
        options={this.typesData()}
      />
    )
  }
}
