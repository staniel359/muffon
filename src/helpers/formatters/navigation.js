import formatHomeSection
  from '*/helpers/formatters/navigation/sections/home'
import formatFeedSection
  from '*/helpers/formatters/navigation/sections/feed'
import formatProfilesSection
  from '*/helpers/formatters/navigation/sections/profiles'
import formatRecomendationsSection
  from '*/helpers/formatters/navigation/sections/recommendations'
import formatSavedTracksSection
  from '*/helpers/formatters/navigation/sections/savedTracks'
import formatRadioSection
  from '*/helpers/formatters/navigation/sections/radio'
import formatPlaylistsSection
  from '*/helpers/formatters/navigation/sections/playlists'
import formatConversationsSection
  from '*/helpers/formatters/navigation/sections/conversations'
import formatCommunitiesSection
  from '*/helpers/formatters/navigation/sections/communities'
import formatMultitagSection
  from '*/helpers/formatters/navigation/sections/multitag'

export function home () {
  return [
    formatHomeSection(
      {
        isActive: true
      }
    )
  ]
}

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

export function savedTracks () {
  return [
    formatSavedTracksSection(
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

export function multitag () {
  return [
    formatMultitagSection(
      {
        isActive: true
      }
    )
  ]
}
