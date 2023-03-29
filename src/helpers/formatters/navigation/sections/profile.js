import {
  main as formatProfileLink
} from '@/helpers/formatters/links/profile'

export default function (
  {
    profileId,
    profileNickname,
    isActive
  }
) {
  function formatLink () {
    if (!isActive) {
      return formatProfileLink(
        {
          profileId
        }
      )
    }
  }

  return {
    name: profileNickname,
    isActive,
    link: formatLink()
  }
}
