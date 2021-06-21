import { localize } from '#/actions/plugins/i18n'

export default function ({ videoTitle, videoId, pageNameKey }) {
  const subpageTitle = pageNameKey && localize(
    `layout.navigation.video.${pageNameKey}`
  ).toLowerCase()

  const title = [
    videoTitle,
    subpageTitle
  ].filter(e => e).join(' ')

  const path = [
    'video',
    'videos',
    videoId,
    pageNameKey
  ].filter(e => e).join('/')

  return {
    icon: 'film',
    title,
    path
  }
}
