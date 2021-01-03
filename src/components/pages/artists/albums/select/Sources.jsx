import React from 'react'
import { Select } from 'semantic-ui-react'

export default class Sources extends React.PureComponent {
  iconData () {
    const { currentSource } = this.props

    if (currentSource) {
      return {
        name: currentSource.key,
        className: `${currentSource.key}Label`
      }
    } else {
      return 'dot circle'
    }
  }

  textData () {
    const { currentSource } = this.props

    return currentSource ? currentSource.name : 'Select source'
  }

  sourcesData () {
    const sourcesList = [
      { key: 'lastfm', name: 'Last.FM' },
      { key: 'vk', name: 'VK' },
      { key: 'bandcamp', name: 'Bandcamp' },
      { key: 'soundcloud', name: 'SoundCloud' }
    ]

    return sourcesList.map(this.sourceData)
  }

  sourceData = source => {
    const { currentSource, setCurrentSource } = this.props

    const selected = currentSource && source.key === currentSource.key
    const handleClick = () => setCurrentSource(source)

    return {
      key: source.key,
      icon: {
        name: source.key,
        className: `${source.key}Icon`
      },
      active: selected,
      selected: selected,
      text: source.name,
      onClick: handleClick
    }
  }

  render () {
    return (
      <Select
        button
        fluid
        labeled
        className="icon albumSourceSelect"
        icon={this.iconData()}
        text={this.textData()}
        options={this.sourcesData()}
      />
    )
  }
}
