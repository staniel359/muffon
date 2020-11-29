import React from 'react'

export default class Show extends React.PureComponent {
  componentDidMount () {
    this.setNavSections()
  }

  setNavSections () {
    const { params } = this.props.match

    const navSections = [
      { content: 'Tags' },
      {
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
