import React from 'react'
import Info from '../Info'
import Tracks from '../Tracks'
import Albums from '../Albums'
import Similar from '../Similar'

export default class Right extends React.PureComponent {
  render () {
    const { artistName } = this.props
    const { scrollToSegmentTop } = this.props
    const props = { artistName, scrollToSegmentTop }

    return (
      <div className="artistPageRightColumn">
        <Info {...props} />

        <Tracks {...props} />

        <Albums {...props} />

        <Similar {...props} />
      </div>
    )
  }
}
