import React from 'react'
import { Form, Input, Dimmer, Segment, Button, Icon } from 'semantic-ui-react'
import Tabs from './Search/Tabs'
import { v4 as uuid } from 'uuid'
import 'styles/global/Search.sass'

export default class Search extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { query: null }
  }

  componentDidMount () {
    this.inputRef = React.createRef()

    this.toggleBodyDimmable()
  }

  componentDidUpdate () {
    const input = this.inputRef.current

    input && input.focus()

    this.toggleBodyDimmable()
  }

  toggleBodyDimmable () {
    if (this.props.searchActive) {
      document.body.className = 'dimmed dimmable'
    } else {
      document.body.removeAttribute('class')
    }
  }

  render () {
    const { query, searchId } = this.state
    const { hideSearch, searchActive } = this.props

    const dimmerVisibilityClassName = searchActive ? 'visible' : 'hidden'
    const dimmerClassName = `searchDimmer ${dimmerVisibilityClassName}`

    const dimmerDataClassName = `searchDimmerData ${query && 'h100'}`

    const handleSubmit = submit => {
      submit.preventDefault()

      const submitValue = this.inputRef.current.value

      submitValue && this.setState({ query: submitValue, searchId: uuid() })
    }

    const clearQuery = () => {
      this.setState({ query: null })

      this.inputRef.current.value = ''
    }

    const clearButton = query && (
      <Icon
        link
        name="times"
        className="searchClearQueryButton"
        onClick={clearQuery}
      />
    )

    const submitButton = (
      <Button compact size="large" type="submit" content="Search" />
    )

    const placeholder = 'Enter something...'
    const ref = this.inputRef
    const searchInputContent = (
      <React.Fragment>
        <Icon name="search" />
        <input {...{ placeholder, ref }} />
        {clearButton}
        {submitButton}
      </React.Fragment>
    )

    const searchForm = (
      <Form onSubmit={handleSubmit}>
        <Input fluid action size="large" iconPosition="left">
          {searchInputContent}
        </Input>
      </Form>
    )

    const tabsProps = { query, hideSearch, searchId }
    const tabsData = query && <Tabs {...tabsProps} />

    const content = (
      <Segment className={dimmerDataClassName}>
        {searchForm}
        {tabsData}
      </Segment>
    )

    return (
      <Dimmer
        page
        active
        className={dimmerClassName}
        onClickOutside={hideSearch}
        {...{ content }}
      />
    )
  }
}
