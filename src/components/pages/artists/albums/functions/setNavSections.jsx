export default function setNavSections () {
  const { params } = this.props.match

  const isAlbumPage = this.dataName === 'album'

  const album = this.state.data
  const artistName = album ? album.artist.name : params.artistName
  const albumTitle = album ? album.title : params.albumTitle

  const artistNameEncoded = encodeURIComponent(artistName)
  const albumTitleEncoded = encodeURIComponent(albumTitle)

  const artistPageLink = `#/artists/${artistNameEncoded}`
  const albumsPageLink = `#/artists/${artistNameEncoded}/albums`
  const albumPageLink = `#/artists/${artistNameEncoded}/albums/${albumTitleEncoded}`

  const navSections = () => {
    if (isAlbumPage) {
      return [
        { content: 'Artists' },
        { content: decodeURIComponent(artistName), href: artistPageLink },
        { content: 'Albums', href: albumsPageLink },
        { content: decodeURIComponent(albumTitle), active: true }
      ]
    } else {
      return [
        { content: 'Artists' },
        { content: decodeURIComponent(artistName), href: artistPageLink },
        { content: 'Albums', href: albumsPageLink },
        { content: decodeURIComponent(albumTitle), href: albumPageLink },
        { content: this.navSectionData, active: true }
      ]
    }
  }

  this.props.setNavSections(navSections())
}
