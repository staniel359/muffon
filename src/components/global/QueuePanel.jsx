import React from 'react'
import { Sidebar, Segment, Button, Divider, Header } from 'semantic-ui-react'
import TracksListContext from './queue/tracks/ListContext'

export default class QueuePanel extends React.PureComponent {
  contentData () {
    return (
      <div className="queuePanelContentWrap">
        {this.headerData()}

        <Divider />

        <TracksListContext />
      </div>
    )
  }

  headerData () {
    const { queue } = this.props

    const headerText = `${queue.length} tracks`

    return (
      <div className="queuePanelHeader">
        {this.hideQueueButtonData()}

        <Header
          as="h5"
          className="queuePanelHeaderText"
          content={headerText}
        />

        {this.clearQueueButtonData()}
      </div>
    )
  }

  hideQueueButtonData () {
    const { hideQueuePanel } = this.props

    return (
      <Button
        className="queuePanelHeaderButton"
        size="large"
        icon="arrow right"
        onClick={hideQueuePanel}
      />
    )
  }

  clearQueueButtonData () {
    const handleClick = () => {
      const { resetQueue, hideQueuePanel } = this.props

      resetQueue()
      hideQueuePanel()
    }

    return (
      <Button
        className="queuePanelHeaderButton"
        size="large"
        icon="close"
        onClick={handleClick}
      />
    )
  }

  render () {
    const { queue, isQueuePanelVisible } = this.props

    const contentData = queue && this.contentData()

    return (
      <Sidebar
        className="queuePanel"
        direction="right"
        animation="overlay"
        as={Segment}
        visible={isQueuePanelVisible}
        content={contentData}
      />
    )
  }
}
