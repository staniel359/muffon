import React from 'react'
import Info from '../Info'
import Tracks from '../Tracks'
import Albums from '../Albums'
import Similar from '../Similar'

export default class Right extends React.PureComponent {
  render () {
    const { artistName, scrollToSegmentTop } = this.props

    const segmentProps = { artistName, scrollToSegmentTop }

    return (
      <div className="artistPageRightColumn">
        <Info {...segmentProps} />

        <Tracks {...segmentProps} />

        <Albums {...segmentProps} />

        <Similar {...segmentProps} />
      </div>
    )
  }
}
