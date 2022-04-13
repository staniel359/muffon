import {
  main as formatProfileMainLink
} from '*/helpers/formatters/links/profile'

export default function (
  {
    profileId,
    profileNickname
  }
) {
  const title = profileNickname

  const {
    path
  } = formatProfileMainLink(
    {
      profileId
    }
  )

  return {
    icon: 'user',
    title,
    path
  }
}
