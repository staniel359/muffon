import React from 'react'
import { v4 as uuid } from 'uuid'
import { Segment } from 'semantic-ui-react'

export default class Home extends React.PureComponent {
  componentDidMount () {
    this.setNavSections()
  }

  setNavSections () {
    const navSections = [{ key: uuid(), content: 'Home' }]

    this.props.setNavSections(navSections)
  }

  render () {
    return <Segment>Home</Segment>
  }
}
