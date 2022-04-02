import formatProfilesSection
  from '*/helpers/formatters/navigation/sections/profiles'
import formatProfileSection
  from '*/helpers/formatters/navigation/sections/profile'
import formatSubpageSection
  from '*/helpers/formatters/navigation/sections/subpage'

export default function ({ profileId, profileNickname, scope }) {
  return [
    formatProfilesSection(),
    formatProfileSection({
      profileId,
      profileNickname,
      isActive: !scope
    }),
    scope && formatSubpageSection({
      scope
    })
  ].filter(e => e)
}
