import formatProfilesSection
  from '@/helpers/formatters/navigation/sections/profiles'
import formatProfileSection
  from '@/helpers/formatters/navigation/sections/profile'
import formatProfileFavoritesSection
  from '@/helpers/formatters/navigation/sections/profile/favorites'
import formatSubpageSection
  from '@/helpers/formatters/navigation/sections/subpage'

export default function (
  {
    profileId,
    profileNickname,
    scope
  }
) {
  return [
    formatProfilesSection(),
    formatProfileSection(
      {
        profileId,
        profileNickname
      }
    ),
    formatProfileFavoritesSection(
      {
        profileId,
        isActive: !scope
      }
    ),
    scope && formatSubpageSection(
      {
        scope
      }
    )
  ].filter(
    e => e
  )
}
