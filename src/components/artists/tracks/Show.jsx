import React from 'react'
import { v4 as uuid } from 'uuid'

export default class Show extends React.PureComponent {
  componentDidMount () {
    this.getInfo()
  }

  componentDidUpdate (prevProps, prevState) {
    const artistName = props => props.match.params.artistName
    const trackTitle = props => props.match.params.trackTitle

    const artistNameChanged = artistName(this.props) !== artistName(prevProps)
    const trackTitleChanged = trackTitle(this.props) !== trackTitle(prevProps)
    const trackChanged = artistNameChanged || trackTitleChanged

    trackChanged && this.getInfo()
  }

  getInfo () {
    const { params } = this.props.match

    this.setNavSections(
      decodeURIComponent(params.artistName),
      decodeURIComponent(params.trackTitle)
    )
  }

  setNavSections (artistName, trackTitle) {
    const artistPageLink = `#/artists/${encodeURIComponent(artistName)}`
    const tracksPageLink = `#/artists/${encodeURIComponent(artistName)}/tracks`
    const navSections = [
      { key: uuid(), content: 'Artists' },
      { key: uuid(), content: artistName, href: artistPageLink },
      { key: uuid(), content: 'Tracks', href: tracksPageLink },
      { key: uuid(), content: trackTitle, active: true }
    ]

    this.props.setNavSections(navSections)
  }

  render () {
    return <div>track</div>
  }
}
