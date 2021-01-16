import React from 'react'
import axios from 'axios'
import { Dropdown, Button } from 'semantic-ui-react'
import getData from './functions/getData'
import getSourceData from './source/functions/getData'

export default class Source extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }

    this.getData = getData.bind(this)
    this.getSourceData = getSourceData.bind(this)
  }

  componentDidMount () {
    this.request = axios.CancelToken.source()

    this.getData()
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  contentData () {
    const { data, isLoading } = this.state
    const { source } = this.props

    const iconClassName = isLoading ? '' : `${source.id} ${source.id}Icon`
    const buttonClassName = `dropdownItemIcon${!data ? ' faded' : ''}`
    const iconButtonData = (
      <Button
        className={buttonClassName}
        loading={isLoading}
        icon={{ className: iconClassName }}
      />
    )

    return (
      <React.Fragment>
        {iconButtonData}
        {source.name}
      </React.Fragment>
    )
  }

  render () {
    const { data } = this.state
    const {
      isSelected,
      setSelectedSource,
      source,
      setSelectedSourceData
    } = this.props

    const handleClick = () => {
      setSelectedSource(source)
      setSelectedSourceData(data)
    }

    return (
      <Dropdown.Item
        disabled={!data}
        active={isSelected}
        selected={isSelected}
        onClick={handleClick}
        content={this.contentData()}
      />
    )
  }
}
