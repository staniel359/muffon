import { localize } from '#/actions/plugins/i18n'

export default function ({ profileId, profileNickname, pageNameKey }) {
  const subpageTitle = pageNameKey && localize(
    `layout.navigation.profile.${pageNameKey}`
  ).toLowerCase()

  const title = [
    profileNickname,
    subpageTitle
  ].filter(e => e).join(' ')

  const path = [
    'profiles',
    profileId,
    pageNameKey
  ].filter(e => e).join('/')

  return {
    icon: 'user',
    title,
    path
  }
}
