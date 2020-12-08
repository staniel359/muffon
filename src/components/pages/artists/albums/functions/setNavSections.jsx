export default function setNavSections (artistName, albumTitle) {
  const artistNameEncoded = encodeURIComponent(artistName)
  const albumTitleEncoded = encodeURIComponent(albumTitle)

  const artistPageLink = `#/artists/${artistNameEncoded}`
  const albumsPageLink = `#/artists/${artistNameEncoded}/albums`
  const albumPageLink = `#/artists/${artistNameEncoded}/albums/${albumTitleEncoded}`

  const isAlbumPage = this.dataName === 'album'

  const navSections = [
    { content: 'Artists' },
    { content: decodeURIComponent(artistName), href: artistPageLink },
    { content: 'Albums', href: albumsPageLink },
    {
      content: decodeURIComponent(albumTitle),
      ...(isAlbumPage ? { active: true } : { href: albumPageLink })
    },
    !isAlbumPage && { content: this.navSectionData, active: true }
  ].filter(e => e)

  this.props.setNavSections(navSections)
}
