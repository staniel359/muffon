import React from 'react'
import { v4 as uuid } from 'uuid'

export default class Home extends React.Component {
  navSections = [
    {
      key: uuid(),
      content: 'Home'
    }
  ]

  componentDidMount () {
    this.props.setNavSections(this.navSections)
  }

  render () {
    return <div>Home</div>
  }
}
