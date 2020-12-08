export default function setNavSections (artistName, trackTitle) {
  const artistNameEncoded = encodeURIComponent(artistName)
  const trackTitleEncoded = encodeURIComponent(trackTitle)

  const artistPageLink = `#/artists/${artistNameEncoded}`
  const tracksPageLink = `#/artists/${artistNameEncoded}/tracks`
  const trackPageLink = `#/artists/${artistNameEncoded}/tracks/${trackTitleEncoded}`

  const isTrackPage = this.dataName === 'track'

  const navSections = [
    { content: 'Artists' },
    { content: decodeURIComponent(artistName), href: artistPageLink },
    { content: 'Tracks', href: tracksPageLink },
    {
      content: decodeURIComponent(trackTitle),
      ...(isTrackPage ? { active: true } : { href: trackPageLink })
    },
    !isTrackPage && { content: this.navSectionData, active: true }
  ].filter(e => e)

  this.props.setNavSections(navSections)
}
