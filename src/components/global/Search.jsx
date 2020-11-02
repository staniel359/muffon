import React from 'react'
import { Form, Input, Dimmer, Segment } from 'semantic-ui-react'
import Tabs from './Search/Tabs'
import { v4 as uuid } from 'uuid'

export default class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.input.current.focus()
  }

  input = React.createRef()

  searchForm () {
    return (
      <Segment
        as={Form}
        onSubmit={this.handleSubmit}
        attached={this.state.query && 'top'}
        content={this.searchInput()}
      />
    )
  }

  handleSubmit = e => {
    e.preventDefault()

    const submitValue = this.input.current.inputRef.current.value
    submitValue && this.setState({ query: submitValue })
  }

  searchInput () {
    return (
      <Input
        size="large"
        placeholder="Enter something..."
        icon="search"
        ref={this.input}
        fluid
      />
    )
  }

  searchTabsProps () {
    const { query } = this.state
    const { hideSearch } = this.props
    const key = uuid()

    return { key, query, hideSearch }
  }

  render () {
    return (
      <Dimmer
        className="search"
        onClickOutside={this.props.hideSearch}
        active
        page
      >
        {this.searchForm()}

        {this.state.query && <Tabs {...this.searchTabsProps()} />}
      </Dimmer>
    )
  }
}
