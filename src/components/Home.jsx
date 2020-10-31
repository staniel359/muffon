import React from 'react'
import { v4 as uuid } from 'uuid'
import { Segment } from 'semantic-ui-react'

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
    return <Segment>Home</Segment>
  }
}
