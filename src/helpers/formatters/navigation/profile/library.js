import formatProfilesSection
  from '*/helpers/formatters/navigation/sections/profiles'
import formatProfileSection
  from '*/helpers/formatters/navigation/sections/profile'
import formatProfileLibrarySection
  from '*/helpers/formatters/navigation/sections/profile/library'
import formatSubpageSection
  from '*/helpers/formatters/navigation/sections/subpage'

export default function ({ profileId, profileNickname, scope }) {
  return [
    formatProfilesSection(),
    formatProfileSection({
      profileId,
      profileNickname
    }),
    formatProfileLibrarySection({
      profileId,
      isActive: !scope
    }),
    scope && formatSubpageSection({
      scope
    })
  ].filter(e => e)
}
