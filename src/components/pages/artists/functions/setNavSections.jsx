export default function setNavSections (artistName) {
  const artistNameEncoded = encodeURIComponent(artistName)
  const artistPageLink = `#/artists/${artistNameEncoded}`

  const isArtistPage = this.dataName === 'artist'

  const navSections = [
    { content: 'Artists' },
    {
      content: decodeURIComponent(artistName),
      ...(isArtistPage ? { active: true } : { href: artistPageLink })
    },
    !isArtistPage && { content: this.navSectionData, active: true }
  ].filter(e => e)

  this.props.setNavSections(navSections)
}
