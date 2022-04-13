import formatFeedSection
  from '*/helpers/formatters/navigation/sections/feed'
import formatProfilesSection
  from '*/helpers/formatters/navigation/sections/profiles'
import formatRecomendationsSection
  from '*/helpers/formatters/navigation/sections/recommendations'
import formatRadioSection
  from '*/helpers/formatters/navigation/sections/radio'
import formatPlaylistsSection
  from '*/helpers/formatters/navigation/sections/playlists'
import formatConversationsSection
  from '*/helpers/formatters/navigation/sections/conversations'
import formatCommunitiesSection
  from '*/helpers/formatters/navigation/sections/communities'

export function feed () {
  return [
    formatFeedSection(
      {
        isActive: true
      }
    )
  ]
}

export function profiles () {
  return [
    formatProfilesSection(
      {
        isActive: true
      }
    )
  ]
}

export function recommendations () {
  return [
    formatRecomendationsSection(
      {
        isActive: true
      }
    )
  ]
}

export function radio () {
  return [
    formatRadioSection(
      {
        isActive: true
      }
    )
  ]
}

export function playlists () {
  return [
    formatPlaylistsSection(
      {
        isActive: true
      }
    )
  ]
}

export function conversations () {
  return [
    formatConversationsSection(
      {
        isActive: true
      }
    )
  ]
}

export function communities () {
  return [
    formatCommunitiesSection(
      {
        isActive: true
      }
    )
  ]
}
