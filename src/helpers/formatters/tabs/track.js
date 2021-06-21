import { localize } from '#/actions/plugins/i18n'

export default function ({ artistName, trackTitle, pageNameKey }) {
  const pageTitle = [
    artistName,
    trackTitle
  ].join(' - ')

  const subpageTitle = pageNameKey && localize(
    `layout.navigation.track.${pageNameKey}`
  ).toLowerCase()

  const title = [
    pageTitle,
    subpageTitle
  ].filter(e => e).join(' ')

  const path = [
    'artists',
    artistName,
    'tracks',
    trackTitle,
    pageNameKey
  ].filter(e => e).join('/')

  return {
    icon: 'music',
    title,
    path
  }
}
