import { localize } from '#/actions/plugins/i18n'

export default function ({ tagName, pageNameKey }) {
  const subpageTitle = pageNameKey && localize(
    `layout.navigation.tag.${pageNameKey}`
  ).toLowerCase()

  const title = [
    tagName,
    subpageTitle
  ].filter(e => e).join(' ')

  const path = [
    'tags',
    encodeURIComponent(tagName),
    pageNameKey
  ].filter(e => e).join('/')

  return {
    icon: 'tag',
    title,
    path
  }
}
