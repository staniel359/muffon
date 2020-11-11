import React from 'react'
import { Form, Input, Dimmer, Segment, Button, Icon } from 'semantic-ui-react'
import Tabs from './Search/Tabs'
import 'styles/global/Search.sass'

export default class Search extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.toggleBodyDimmable()
  }

  componentDidUpdate () {
    this.toggleBodyDimmable()

    const input = this.inputRef.current

    input && input.focus()
  }

  toggleBodyDimmable () {
    const className = this.props.searchActive ? 'dimmed dimmable' : ''

    document.body.className = className
    !document.body.className && document.body.removeAttribute('class')
  }

  render () {
    const { query } = this.state
    const { hideSearch, searchActive } = this.props

    const dimmerVisibilityClassName = searchActive ? 'visible' : 'hidden'
    const dimmerClassName = `searchDimmer ${dimmerVisibilityClassName}`

    const dimmerDataClassName = `searchDimmerData ${query && 'h100'}`

    this.inputRef = React.createRef()

    const handleSubmit = e => {
      e.preventDefault()

      const submitValue = this.inputRef.current.value

      submitValue && this.setState({ query: submitValue })
    }

    const placeholder = 'Enter something...'

    const clearQuery = () => {
      this.setState({ query: null })

      this.inputRef.current.value = ''
    }

    const clearButton = query && (
      <Icon
        circular
        link
        size="small"
        name="times"
        className="searchClearQueryButton"
        onClick={clearQuery}
      />
    )

    const submitButton = (
      <Button compact size="large" type="submit" content="Search" />
    )

    const searchInputContent = (
      <React.Fragment>
        <Icon name="search" />
        <input placeholder={placeholder} ref={this.inputRef} />
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

    const tabsProps = { query, hideSearch }
    const tabsData = query && <Tabs {...tabsProps} />

    const dimmerData = (
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
        content={dimmerData}
      />
    )
  }
}
