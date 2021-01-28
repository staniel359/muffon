import React from 'react'
import { Tab, Segment, Ref } from 'semantic-ui-react'
import ErrorMessage from 'global/ErrorMessage'

export default function tabData () {
  const { active, tabRef } = this.props

  const isLoading = active && this.state.isLoading

  const errorData = () => {
    const { error } = this.state

    const handleRefresh = () => this.getData()
    const errorDataProps = { error, handleRefresh }

    return <ErrorMessage {...errorDataProps} />
  }

  const contentData = () => {
    const { data, error } = this.state

    if (data) {
      return this.contentData()
    } else {
      if (error) {
        return errorData()
      } else {
        return <React.Fragment />
      }
    }
  }

  const refData = <Ref innerRef={tabRef}>{contentData()}</Ref>

  const segmentData = (
    <Segment
      className="searchResultsTabContentWrap"
      loading={isLoading}
      content={refData}
    />
  )

  return (
    <Tab.Pane
      className="searchResultsTab"
      content={segmentData}
      {...{ active }}
    />
  )
}
