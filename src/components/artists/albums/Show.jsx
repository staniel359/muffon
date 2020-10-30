import React from 'react'
import { v4 as uuid } from 'uuid'

export class Show extends React.Component {
  artistName = this.props.match.params.artistName
  albumTitle = this.props.match.params.albumTitle

  navSections = [
    {
      key: uuid(),
      content: 'Artists'
    },
    {
      key: uuid(),
      content: decodeURIComponent(this.artistName),
      href: `#/artists/${this.artistName}`
    },
    {
      key: uuid(),
      content: 'Albums'
    },
    {
      key: uuid(),
      content: decodeURIComponent(this.albumTitle),
      active: true
    }
  ]

  componentDidMount () {
    this.props.setNavSections(this.navSections)
  }

  render () {
    return <div>album</div>
  }
}
