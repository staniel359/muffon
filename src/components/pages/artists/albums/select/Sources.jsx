import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import Source from './sources/Source'

export default class Sources extends React.PureComponent {
  iconData () {
    const { selectedSource } = this.props

    if (selectedSource) {
      return { className: `${selectedSource.id} ${selectedSource.id}Label` }
    } else {
      return { name: 'dot circle' }
    }
  }

  textData () {
    const { selectedSource } = this.props

    return selectedSource ? selectedSource.name : 'Select source'
  }

  sourcesData () {
    const { sources } = this.props

    return sources.map(this.sourceData)
  }

  sourceData = source => {
    const {
      selectedSource,
      requestData,
      setSelectedSource,
      setSelectedSourceData
    } = this.props

    const isSelected = !!selectedSource && source.id === selectedSource.id

    const sourceProps = {
      key: source.id,
      source,
      isSelected,
      requestData,
      setSelectedSource,
      setSelectedSourceData
    }

    return <Source {...sourceProps} />
  }

  render () {
    return (
      <Dropdown
        button
        fluid
        labeled
        selection
        className="icon albumSourceSelect"
        icon={this.iconData()}
        text={this.textData()}
        options={this.sourcesData()}
      />
    )
  }
}
