import React from 'react'
import { Form, Input, Dimmer, Segment } from 'semantic-ui-react'
import Tabs from './Search/Tabs'
import { v4 as uuid } from 'uuid'
import 'styles/global/Search.sass'

export default class Search extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.input.current.focus()
  }

  handleSubmit = e => {
    e.preventDefault()

    const query = this.input.current.inputRef.current.value

    query && this.setState({ query: query })
  }

  render () {
    this.input = React.createRef()

    const { query } = this.state
    const { hideSearch } = this.props

    const key = uuid()
    const placeholder = 'Enter something...'

    const searchInput = (
      <Input
        fluid
        size="large"
        icon="search"
        placeholder={placeholder}
        ref={this.input}
      />
    )

    const searchForm = (
      <Segment
        as={Form}
        onSubmit={this.handleSubmit}
        attached={query && 'top'}
        content={searchInput}
      />
    )

    const tabsProps = { key, query, hideSearch }
    const tabsData = query && <Tabs {...tabsProps} />

    return (
      <Dimmer active page className="search" onClickOutside={hideSearch}>
        {searchForm}
        {tabsData}
      </Dimmer>
    )
  }
}
