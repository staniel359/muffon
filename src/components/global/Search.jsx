import React from 'react'
import { Form, Input, Dimmer, Segment, Button, Icon } from 'semantic-ui-react'
import Tabs from './Search/Tabs'
import { v4 as uuid } from 'uuid'

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
    const { isSearchActive } = this.props

    const { classList } = document.body

    if (isSearchActive) {
      classList.add('dimmed')
      classList.add('dimmable')
    } else {
      classList.remove('dimmed')
      classList.remove('dimmable')

      if (classList.length === 0) {
        document.body.removeAttribute('class')
      }
    }
  }

  render () {
    const { query, searchId } = this.state
    const { hideSearch, isSearchActive } = this.props

    const dimmerClassName = `searchDimmer ${
      isSearchActive ? 'visible' : 'hidden'
    }`

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
        <input className="mousetrap" {...{ placeholder, ref }} />
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

    const contentData = (
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
        content={contentData}
      />
    )
  }
}
