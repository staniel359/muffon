import React from 'react'
import { v4 as uuid } from 'uuid'

export class Show extends React.Component {
  tagName = this.props.match.params.tagName

  navSections = [
    {
      key: uuid(),
      content: 'Tags'
    },
    {
      key: uuid(),
      content: decodeURIComponent(this.tagName),
      href: `#/tags/${this.tagName}`
    }
  ]

  componentDidMount () {
    this.props.setNavSections(this.navSections)
  }

  render () {
    return <div>{this.tagName}</div>
  }
}
