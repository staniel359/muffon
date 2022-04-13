import {
  main as formatProfileMainLink
} from '*/helpers/formatters/links/profile'

export default function (
  {
    profileId,
    profileNickname,
    isActive
  }
) {
  function formatLink () {
    if (!isActive) {
      return formatProfileMainLink(
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
