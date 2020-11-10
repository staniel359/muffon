import React from 'react'
import { Form, Input, Dimmer, Segment } from 'semantic-ui-react'
import Tabs from './Search/Tabs'
import 'styles/global/Search.sass'

export default class Search extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidUpdate () {
    this.input.current && this.input.current.focus()
  }

  render () {
    const { query } = this.state
    const { hideSearch, searchActive } = this.props

    const className = `searchDimmer ${searchActive ? 'visible' : 'hidden'}`

    const placeholder = 'Enter something...'

    this.input = React.createRef()

    const searchInput = (
      <Input
        fluid
        size="large"
        icon="search"
        placeholder={placeholder}
        ref={this.input}
      />
    )

    const handleSubmit = e => {
      e.preventDefault()

      const submitValue = this.input.current.inputRef.current.value

      submitValue && this.setState({ query: submitValue })
    }

    const searchForm = (
      <Segment
        as={Form}
        onSubmit={handleSubmit}
        attached={query && 'top'}
        content={searchInput}
      />
    )

    const tabsData = query && <Tabs {...{ query, hideSearch }} />

    return (
      <Dimmer active page className={className} onClickOutside={hideSearch}>
        {searchForm}
        {tabsData}
      </Dimmer>
    )
  }
}
