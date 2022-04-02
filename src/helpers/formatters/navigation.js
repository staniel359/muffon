import formatFeedSection
  from '*/helpers/formatters/navigation/sections/feed'
import formatProfilesSection
  from '*/helpers/formatters/navigation/sections/profiles'
import formatRecomendationsSection
  from '*/helpers/formatters/navigation/sections/recommendations'
import formatBookmarksSection
  from '*/helpers/formatters/navigation/sections/bookmarks'
import formatRadioSection
  from '*/helpers/formatters/navigation/sections/radio'
import formatPlaylistsSection
  from '*/helpers/formatters/navigation/sections/playlists'
import formatConversationsSection
  from '*/helpers/formatters/navigation/sections/conversations'
import formatCommunitiesSection
  from '*/helpers/formatters/navigation/sections/communities'

export const feed = () => {
  return [
    formatFeedSection({
      isActive: true
    })
  ]
}

export const profiles = () => {
  return [
    formatProfilesSection({
      isActive: true
    })
  ]
}

export const recommendations = () => {
  return [
    formatRecomendationsSection({
      isActive: true
    })
  ]
}

export const bookmarks = () => {
  return [
    formatBookmarksSection({
      isActive: true
    })
  ]
}

export const radio = () => {
  return [
    formatRadioSection({
      isActive: true
    })
  ]
}

export const playlists = () => {
  return [
    formatPlaylistsSection({
      isActive: true
    })
  ]
}

export const conversations = () => {
  return [
    formatConversationsSection({
      isActive: true
    })
  ]
}

export const communities = () => {
  return [
    formatCommunitiesSection({
      isActive: true
    })
  ]
}
