import React from 'react'
import { Form, Input, Dimmer, Segment } from 'semantic-ui-react'
import Results from './Search/Results'
import { v4 as uuid } from 'uuid'

export default class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.input = React.createRef()
  }

  componentDidMount () {
    this.input.current.focus()
  }

  searchForm () {
    return (
      <Segment attached={this.state.query && 'top'}>
        <Form onSubmit={this.handleSubmit}>
          <Input
            size="large"
            placeholder="Enter something..."
            icon="search"
            ref={this.input}
            fluid
          />
        </Form>
      </Segment>
    )
  }

  handleSubmit = e => {
    e.preventDefault()

    const query = this.input.current.inputRef.current.value
    if (query) {
      this.setState({ query: query })
    }
  }

  searchResults () {
    return (
      this.state.query && (
        <Results
          key={uuid()}
          query={this.state.query}
          hideGlobalSearch={this.props.hideGlobalSearch}
        />
      )
    )
  }

  render () {
    return (
      <Dimmer
        className="globalSearch"
        onClickOutside={this.props.hideGlobalSearch}
        active
        page
      >
        {this.searchForm()}

        {this.searchResults()}
      </Dimmer>
    )
  }
}
