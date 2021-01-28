import React from 'react'
import { Helmet } from 'react-helmet'

export default class Title extends React.PureComponent {
  titleData () {
    const strings = [this.audioTrackData(), 'muffon']

    return strings.filter(Boolean).join(' | ')
  }

  audioTrackData () {
    const strings = [this.audioStatusIcon(), this.trackFullTitle()]

    return strings.filter(Boolean).join(' ')
  }

  audioStatusIcon () {
    const { audioStatus } = this.props

    switch (audioStatus) {
      case 'play':
        return '❚❚'
      case 'pause':
        return '▶'
      default:
        return ''
    }
  }

  trackFullTitle () {
    const { currentTrack } = this.props

    if (currentTrack) {
      const { artist, title } = this.props.currentTrack

      return [artist.name, title].join(' - ')
    } else {
      return ''
    }
  }

  render () {
    return (
      <Helmet>
        <title>{this.titleData()}</title>
      </Helmet>
    )
  }
}
