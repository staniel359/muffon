import { localize } from '#/actions/plugins/i18n'

export default function ({ artistName, albumTitle, pageNameKey }) {
  const pageTitle = [
    artistName,
    albumTitle
  ].join(' - ')

  const subpageTitle = pageNameKey && localize(
    `layout.navigation.album.${pageNameKey}`
  ).toLowerCase()

  const title = [
    pageTitle,
    subpageTitle
  ].filter(e => e).join(' ')

  const path = [
    'artists',
    encodeURIComponent(artistName),
    'albums',
    encodeURIComponent(albumTitle),
    pageNameKey
  ].filter(e => e).join('/')

  return {
    icon: 'record vinyl',
    title,
    path
  }
}
