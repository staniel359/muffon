import formatProfilesSection
  from '*/helpers/formatters/navigation/sections/profiles'
import formatProfileSection
  from '*/helpers/formatters/navigation/sections/profile'
import formatProfileLibrarySection
  from '*/helpers/formatters/navigation/sections/profile/library'
import formatProfileLibraryTagsSection
  from '*/helpers/formatters/navigation/sections/profile/library/tags'
import formatProfileLibraryTagSection
  from '*/helpers/formatters/navigation/sections/profile/library/tag'
import formatSubpageSection
  from '*/helpers/formatters/navigation/sections/subpage'

export default function (
  {
    profileId,
    profileNickname,
    tagId,
    tagName,
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
    formatProfileLibrarySection(
      {
        profileId
      }
    ),
    formatProfileLibraryTagsSection(
      {
        profileId
      }
    ),
    formatProfileLibraryTagSection(
      {
        profileId,
        tagId,
        tagName,
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
