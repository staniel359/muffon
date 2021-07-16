import { localize } from '#/actions/plugins/i18n'

export default function ({ artistName, pageNameKey }) {
  const subpageTitle = pageNameKey && localize(
    `layout.navigation.artist.${pageNameKey}`
  ).toLowerCase()

  const title = [
    artistName,
    subpageTitle
  ].filter(e => e).join(' ')

  const path = [
    'artists',
    encodeURIComponent(artistName),
    pageNameKey
  ].filter(e => e).join('/')

  return {
    icon: 'microphone',
    title,
    path
  }
}
