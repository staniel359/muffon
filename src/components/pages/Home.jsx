import React from 'react'
import { Segment } from 'semantic-ui-react'

export default class Home extends React.PureComponent {
  componentDidMount () {
    this.setNavSections()
  }

  setNavSections () {
    const navSections = [{ content: 'Home' }]

    this.props.setNavSections(navSections)
  }

  render () {
    return <Segment className="pageSegment">Home</Segment>
  }
}
