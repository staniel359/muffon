import React from 'react'
import { v4 as uuid } from 'uuid'

export default class Show extends React.PureComponent {
  componentDidMount () {
    this.setNavSections()
  }

  setNavSections () {
    const { params } = this.props.match

    const navSections = [
      { key: uuid(), content: 'Artists' },
      {
        key: uuid(),
        content: decodeURIComponent(params.artistName),
        href: `#/artists/${params.artistName}`
      },
      { key: uuid(), content: 'Tracks' },
      {
        key: uuid(),
        content: decodeURIComponent(params.trackTitle),
        active: true
      }
    ]

    this.props.setNavSections(navSections)
  }

  render () {
    return <div>track</div>
  }
}
