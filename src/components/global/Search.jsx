import React from 'react'
import Store from 'electron-store'
import { v4 as uuid } from 'uuid'
import { Dimmer, Segment, Search, Form } from 'semantic-ui-react'
import Tabs from './Search/Tabs'

export default class SearchDimmer extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { query: null }

    this.inputRef = React.createRef()
    this.global = new Store()
    this.historySize = 20
  }

  componentDidMount () {
    this.toggleBodyDimmable()
  }

  componentDidUpdate () {
    this.toggleBodyDimmable()
  }

  toggleBodyDimmable () {
    const { isSearchActive } = this.props
    const { classList } = document.body

    const handleShow = () => {
      classList.add('dimmed')
      classList.add('dimmable')
    }

    const handleHide = () => {
      classList.remove('dimmed')
      classList.remove('dimmable')

      if (classList.length === 0) {
        document.body.removeAttribute('class')
      }
    }

    isSearchActive ? handleShow() : handleHide()
  }

  contentData () {
    const { query, searchId } = this.state
    const { hideSearch } = this.props

    const queryClassName = !!query ? 'h100' : ''
    const className = ['searchDimmerData', queryClassName].join(' ')

    const tabsProps = { query, hideSearch, searchId }
    const tabsData = !!query && <Tabs {...tabsProps} />

    return (
      <Segment {...{ className }}>
        {this.searchForm()}
        {tabsData}
      </Segment>
    )
  }

  searchForm () {
    const iconData = () => {
      const { query } = this.state

      const queryIconData = {
        name: 'close',
        style: { pointerEvents: 'unset', cursor: 'pointer' },
        onClick: () => {
          this.setState({ query: null })
          this.inputRef.current.state.value = ''
        }
      }

      return query ? queryIconData : 'search'
    }

    const searchHistory = this.global.get('searchHistory', [])

    const searchHistoryData = () => {
      const searchItem = query => ({ key: uuid(), value: query, title: query })

      return searchHistory.slice(0, this.historySize).map(searchItem)
    }

    const changeQuery = query => {
      this.setState({ query })

      if (query) {
        if (query !== searchHistory[0]) {
          searchHistory.unshift(query)

          this.global.set({ searchHistory })
        }

        this.setState({ searchId: uuid() })
      }
    }

    const handleSubmit = () => {
      const searchInput = this.inputRef.current

      changeQuery(searchInput.state.value)
      searchInput.close()
    }

    const handleResultSelect = (_, { result }) => {
      changeQuery(result.value)
    }

    return (
      <Form onSubmit={handleSubmit}>
        <Search
          fluid
          className="searchInput"
          size="large"
          placeholder="Enter something..."
          noResultsMessage="Your search history is empty."
          minCharacters={0}
          icon={iconData()}
          results={searchHistoryData()}
          ref={this.inputRef}
          onResultSelect={handleResultSelect}
        />
      </Form>
    )
  }

  render () {
    const { isSearchActive, hideSearch } = this.props

    const searchActiveClassName = isSearchActive ? 'visible' : 'hidden'
    const className = ['searchDimmer', searchActiveClassName].join(' ')

    return (
      <Dimmer
        page
        active
        content={this.contentData()}
        onClickOutside={hideSearch}
        {...{ className }}
      />
    )
  }
}
