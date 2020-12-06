import React from 'react'
import Info from '../Info'
import Tracks from '../Tracks'
import Albums from '../Albums'
import Similar from '../Similar'
import { Ref } from 'semantic-ui-react'

export default class Right extends React.PureComponent {
  render () {
    const { artistName, scrollToTop, refs } = this.props

    return (
      <div className="artistPageRightColumn">
        <Ref innerRef={refs.infoRef}>
          <Info {...{ artistName }} />
        </Ref>
        <Ref innerRef={refs.tracksRef}>
          <Tracks {...{ artistName, scrollToTop }} />
        </Ref>
        <Ref innerRef={refs.albumsRef}>
          <Albums {...{ artistName, scrollToTop }} />
        </Ref>
        <Ref innerRef={refs.similarRef}>
          <Similar {...{ artistName, scrollToTop }} />
        </Ref>
      </div>
    )
  }
}
