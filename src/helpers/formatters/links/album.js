export const main = ({ artistName, albumTitle }) => {
  return {
    name: 'AlbumMainPage',
    params: { artistName, albumTitle },
    path: [
      'artists',
      encodeURIComponent(artistName),
      'albums',
      encodeURIComponent(albumTitle)
    ].join('/')
  }
}
