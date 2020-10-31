import React from 'react'
import { v4 as uuid } from 'uuid'

export default class Show extends React.Component {
  artistName = this.props.match.params.artistName
  trackTitle = this.props.match.params.trackTitle

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
      content: 'Tracks'
    },
    {
      key: uuid(),
      content: decodeURIComponent(this.trackTitle),
      active: true
    }
  ]

  componentDidMount () {
    this.props.setNavSections(this.navSections)
  }

  render () {
    return <div>track</div>
  }
}
