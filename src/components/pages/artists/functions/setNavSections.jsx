export default function setNavSections () {
  const { artist } = this.state
  const { params } = this.props.match

  const isArtistPage = this.dataName === 'artist'

  const artistName = artist ? artist.name : params.artistName

  const artistNameEncoded = encodeURIComponent(artistName)
  const artistPageLink = `#/artists/${artistNameEncoded}`

  const navSections = () => {
    if (isArtistPage) {
      return [
        { content: 'Artists' },
        { content: decodeURIComponent(artistName), active: true }
      ]
    } else {
      return [
        { content: 'Artists' },
        { content: decodeURIComponent(artistName), href: artistPageLink },
        { content: this.navSectionData, active: true }
      ]
    }
  }

  this.props.setNavSections(navSections())
}
