import React from 'react'
import { v4 as uuid } from 'uuid'

export default class Show extends React.PureComponent {
  componentDidMount () {
    this.setNavSections()
  }

  setNavSections () {
    const { params } = this.props.match

    const navSections = [
      { key: uuid(), content: 'Tags' },
      {
        key: uuid(),
        content: decodeURIComponent(params.tagName),
        href: `#/tags/${params.tagName}`
      }
    ]

    this.props.setNavSections(navSections)
  }

  render () {
    return <div>tag</div>
  }
}
