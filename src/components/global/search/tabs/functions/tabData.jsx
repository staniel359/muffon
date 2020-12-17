import React from 'react'
import { Tab, Segment, Ref } from 'semantic-ui-react'
import ErrorMessage from 'global/ErrorMessage'

export default function tabData () {
  const { data, error, isLoading } = this.state
  const { active } = this.props

  const contentData = data && this.contentData()

  const handleRefresh = this.getData
  const errorDataProps = { error, handleRefresh }
  const errorData = error && <ErrorMessage {...errorDataProps} />

  const tabData = contentData || errorData || <React.Fragment />
  const refData = <Ref innerRef={this.tabRef}>{tabData}</Ref>

  return (
    <Tab.Pane className="searchResultsTab" {...{ active }}>
      <Segment
        className="searchResultsTabContentWrap"
        loading={active && isLoading}
        content={refData}
      />
    </Tab.Pane>
  )
}
