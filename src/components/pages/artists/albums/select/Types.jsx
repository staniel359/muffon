import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import Type from './types/Type'

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

    const isDisabled = !data[type.id]
    const isSelected = !!selectedType && selectedType.id === type.id
    const typeProps = {
      key: type.id,
      type,
      isDisabled,
      isSelected,
      setSelectedType
    }

    return <Type {...typeProps} />
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
