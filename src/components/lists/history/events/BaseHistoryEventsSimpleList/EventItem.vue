<template>
  <div
    class="item main-simple-list-item main-event-item"
  >
    <BaseIcon
      class="grey"
      :icon="modelIcon"
    />

    <div class="content">
      <div
        v-html="eventText"
      />
    </div>

    <BaseIcon
      class="event-type-icon"
      :icon="eventTypeIcon"
    />

    <BaseCreatedSection
      class="description right"
      :model-data="eventData"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseCreatedSection from '@/components/sections/BaseCreatedSection.vue'
import {
  camelCase
} from 'camel-case'
import {
  main as formatAlbumMainLink
} from '@/helpers/formatters/links/album'
import {
  main as formatArtistMainLink
} from '@/helpers/formatters/links/artist'
import {
  main as formatTrackMainLink
} from '@/helpers/formatters/links/track'
import {
  main as formatVideoMainLink
} from '@/helpers/formatters/links/video'
import {
  main as formatCommunityMainLink
} from '@/helpers/formatters/links/community'
import {
  main as formatProfileMainLink,
  playlist as formatProfilePlaylistLink
} from '@/helpers/formatters/links/profile'

export default {
  name: 'EventItem',
  components: {
    BaseIcon,
    BaseCreatedSection
  },
  props: {
    eventData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      modelIcons: {
        bookmarkAlbum: 'bookmark',
        bookmarkArtist: 'bookmark',
        bookmarkTrack: 'bookmark',
        bookmarkVideo: 'bookmark',
        community: 'community',
        conversation: 'conversation',
        favoriteAlbum: 'favorite',
        favoriteArtist: 'favorite',
        favoriteTrack: 'favorite',
        favoriteVideo: 'favorite',
        libraryAlbum: 'library',
        libraryArtist: 'library',
        libraryTrack: 'library',
        listenedAlbum: 'listened',
        listenedArtist: 'listened',
        listenedTrack: 'listened',
        membership: 'member',
        playlist: 'playlist',
        playlistTrack: 'playlist',
        post: 'post',
        profile: 'profile',
        recommendation: 'recommendation',
        relationship: 'follower',
        watchedVideo: 'watched'
      },
      models: {
        bookmarkAlbum: 'album',
        bookmarkArtist: 'artist',
        bookmarkTrack: 'track',
        bookmarkVideo: 'video',
        community: 'community',
        conversation: 'conversation',
        favoriteAlbum: 'album',
        favoriteArtist: 'artist',
        favoriteTrack: 'track',
        favoriteVideo: 'video',
        libraryAlbum: 'album',
        libraryArtist: 'artist',
        libraryTrack: 'track',
        listenedAlbum: 'album',
        listenedArtist: 'artist',
        listenedTrack: 'track',
        membership: 'membership',
        playlist: 'playlist',
        playlistTrack: 'playlistTrack',
        post: 'post',
        profile: 'profile',
        recommendation: 'recommendation',
        relationship: 'relationship',
        watchedVideo: 'video'
      }
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    modelIcon () {
      return this.modelIcons[
        this.modelTypeFormatted
      ]
    },
    modelTypeFormatted () {
      return camelCase(
        this.modelType
      )
    },
    modelType () {
      return this.eventData.model.type
    },
    eventText () {
      return this.$t(
        `events.${this.eventType}.${this.modelTypeFormatted}`,
        {
          modelName: this.modelNameLink,
          playlistTitle: this.playlistTitleLink
        }
      )
    },
    eventType () {
      return this.eventData.type
    },
    modelNameLink () {
      return this.formatModelNameLink(
        {
          modelName: this.modelName,
          modelLink: this.modelLink
        }
      )
    },
    modelLink () {
      switch (this.model) {
        case 'album':
          return formatAlbumMainLink(
            {
              albumTitle: this.albumTitle,
              artistName: this.albumArtistName
            }
          ).path
        case 'artist':
          return formatArtistMainLink(
            {
              artistName: this.artistName
            }
          ).path
        case 'track':
          return formatTrackMainLink(
            {
              trackTitle: this.trackTitle,
              artistName: this.trackArtistName
            }
          ).path
        case 'playlistTrack':
          return formatTrackMainLink(
            {
              trackTitle: this.trackTitle,
              artistName: this.trackArtistName
            }
          ).path
        case 'video':
          return formatVideoMainLink(
            {
              videoId: this.videoId
            }
          ).path
        case 'community':
          return formatCommunityMainLink(
            {
              communityId: this.id
            }
          ).path
        case 'recommendation':
          return formatArtistMainLink(
            {
              artistName: this.artistName
            }
          ).path
        case 'relationship':
          return formatProfileMainLink(
            {
              profileId: this.otherProfileId
            }
          ).path
        case 'playlist':
          return formatProfilePlaylistLink(
            {
              profileId: this.profileId,
              playlistId: this.id
            }
          ).path
        case 'conversation':
          return formatProfileMainLink(
            {
              profileId: this.otherProfileId
            }
          ).path
        case 'membership':
          return formatCommunityMainLink(
            {
              communityId: this.communityId
            }
          ).path
        default:
          return null
      }
    },
    modelName () {
      switch (this.model) {
        case 'album':
          return [
            this.albumArtistName,
            this.albumTitle
          ].join(
            ' - '
          )
        case 'artist':
          return this.artistName
        case 'track':
          return [
            this.trackArtistName,
            this.trackTitle
          ].join(
            ' - '
          )
        case 'playlistTrack':
          return [
            this.trackArtistName,
            this.trackTitle
          ].join(
            ' - '
          )
        case 'video':
          return this.videoTitle
        case 'community':
          return this.title
        case 'recommendation':
          return this.artistName
        case 'relationship':
          return this.otherProfileNickname
        case 'post':
          return this.text
        case 'playlist':
          return this.title
        case 'conversation':
          return this.otherProfileNickname
        case 'membership':
          return this.communityTitle
        default:
          return null
      }
    },
    model () {
      return this.models[
        this.modelTypeFormatted
      ]
    },
    albumArtistName () {
      return this.modelData.album.artist.name
    },
    modelData () {
      return this.eventData.model.data
    },
    albumTitle () {
      return this.modelData.album.title
    },
    artistName () {
      return this.modelData.artist.name
    },
    trackArtistName () {
      return this.modelData.track.artist.name
    },
    trackTitle () {
      return this.modelData.track.title
    },
    videoTitle () {
      return this.modelData.video.title
    },
    title () {
      return this.modelData.title
    },
    playlistTitleLink () {
      return this.formatModelNameLink(
        {
          modelName: this.playlistTitle,
          modelLink: this.playlistLink
        }
      )
    },
    playlistLink () {
      return formatProfilePlaylistLink(
        {
          profileId: this.profileId,
          playlistId: this.playlistId
        }
      ).path
    },
    playlistId () {
      return this.modelData?.playlist?.id
    },
    playlistTitle () {
      return this.modelData?.playlist?.title
    },
    otherProfileNickname () {
      return this.modelData.other_profile.nickname
    },
    otherProfileId () {
      return this.modelData.other_profile.id
    },
    text () {
      return (
        this.modelData.text || ''
      )
    },
    communityTitle () {
      return this.modelData.community.title
    },
    communityId () {
      return this.modelData.community.id
    },
    videoId () {
      return this.modelData.video.youtube_id
    },
    id () {
      return this.modelData.id
    },
    eventTypeIcon () {
      return camelCase(
        `event_${this.eventType}`
      )
    }
  },
  methods: {
    formatModelNameLink (
      {
        modelName,
        modelLink
      }
    ) {
      if (modelLink) {
        return `
          <strong>
            <a
              class="ui main-link"
              href="/#/${modelLink}"
            >
              ${modelName}
            </a>
          </strong>
        `
      } else {
        return `
          <strong>
            ${modelName}
          </strong>
        `
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.content
  margin-left: 0.75em

.event-type-icon
  @extend .no-padding
  margin-left: 0.75em !important
  min-width: unset !important
</style>
