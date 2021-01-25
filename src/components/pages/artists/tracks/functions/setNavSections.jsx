export default function setNavSections () {
  const { params } = this.props.match
  const { track } = this.state

  const isTrackPage = this.dataName === 'track'

  const artistName = track ? track.artist.name : params.artistName
  const trackTitle = track ? track.title : params.trackTitle

  const artistNameEncoded = encodeURIComponent(artistName)
  const trackTitleEncoded = encodeURIComponent(trackTitle)

  const artistPageLink = `#/artists/${artistNameEncoded}`
  const tracksPageLink = `#/artists/${artistNameEncoded}/tracks`
  const trackPageLink = `#/artists/${artistNameEncoded}/tracks/${trackTitleEncoded}`

  const navSections = () => {
    if (isTrackPage) {
      return [
        { content: 'Artists' },
        { content: decodeURIComponent(artistName), href: artistPageLink },
        { content: 'Tracks', href: tracksPageLink },
        { content: decodeURIComponent(trackTitle), active: true }
      ]
    } else {
      return [
        { content: 'Artists' },
        { content: decodeURIComponent(artistName), href: artistPageLink },
        { content: 'Tracks', href: tracksPageLink },
        { content: decodeURIComponent(trackTitle), href: trackPageLink },
        { content: this.navSectionData, active: true }
      ]
    }
  }

  this.props.setNavSections(navSections())
}
