import React from 'react'
import { v4 as uuid } from 'uuid'
import { Dropdown } from 'semantic-ui-react'
import Source from './sources/Source'

export default class Sources extends React.PureComponent {
  iconData () {
    const { selectedSource } = this.props

    if (selectedSource) {
      const sourceId = selectedSource.id
      const className = [sourceId, `${sourceId}Label`].join(' ')

      return { className }
    } else {
      return { name: 'dot circle' }
    }
  }

  textData () {
    const { selectedSource } = this.props

    return selectedSource ? selectedSource.name : 'Select source'
  }

  sourcesData () {
    const header = text => {
      return <Dropdown.Header key={uuid()} content={text} />
    }

    const sourcesWithStreamable = bool => {
      const { sources } = this.props

      return sources.filter(s => s.streamable === bool).map(this.sourceData)
    }

    const streamableHeader = header('Streamable')
    const streamableSources = sourcesWithStreamable(true)

    const divider = <Dropdown.Divider key={uuid()} />

    const otherHeader = header('Other')
    const otherSources = sourcesWithStreamable(false)

    const sourcesData = [
      streamableHeader,
      ...streamableSources,
      divider,
      otherHeader,
      ...otherSources
    ]

    return sourcesData
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
