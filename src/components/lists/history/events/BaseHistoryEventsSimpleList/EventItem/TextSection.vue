<template>
  <i18n-t
    tag="div"
    :keypath="eventTextKey"
  >
    <template
      #modelName
    >
      <strong>
        <BaseLink
          v-if="modelLink"
          :text="modelName"
          :link="modelLink"
        />
        <template
          v-else
        >
          {{ modelName }}
        </template>
      </strong>
    </template>

    <template
      #playlistTitle
    >
      <strong>
        <BaseLink
          :text="playlistTitle"
          :link="playlistLink"
        />
      </strong>
    </template>
  </i18n-t>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseLink from '@/components/links/BaseLink.vue'
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
  name: 'TextSection',
  components: {
    BaseLink
  },
  props: {
    eventType: {
      type: String,
      required: true
    },
    modelType: {
      type: String,
      required: true
    },
    eventData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
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
    eventTextKey () {
      return [
        'events',
        this.eventType,
        this.modelType
      ].join(
        '.'
      )
    },
    modelLink () {
      switch (this.model) {
        case 'album':
          return formatAlbumMainLink(
            {
              albumTitle:
                this.albumTitle,
              artistName:
                this.albumArtistName
            }
          )
        case 'artist':
          return formatArtistMainLink(
            {
              artistName:
                this.artistName
            }
          )
        case 'track':
          return formatTrackMainLink(
            {
              trackTitle:
                this.trackTitle,
              artistName:
                this.trackArtistName
            }
          )
        case 'playlistTrack':
          return formatTrackMainLink(
            {
              trackTitle:
                this.trackTitle,
              artistName:
                this.trackArtistName
            }
          )
        case 'video':
          return formatVideoMainLink(
            {
              videoId: this.videoId
            }
          )
        case 'community':
          return formatCommunityMainLink(
            {
              communityId: this.id
            }
          )
        case 'recommendation':
          return formatArtistMainLink(
            {
              artistName:
                this.artistName
            }
          )
        case 'relationship':
          return formatProfileMainLink(
            {
              profileId:
                this.otherProfileId
            }
          )
        case 'playlist':
          return formatProfilePlaylistLink(
            {
              profileId:
                this.profileId,
              playlistId: this.id
            }
          )
        case 'conversation':
          return formatProfileMainLink(
            {
              profileId:
                this.otherProfileId
            }
          )
        case 'membership':
          return formatCommunityMainLink(
            {
              communityId:
                this.communityId
            }
          )
        default:
          return null
      }
    },
    model () {
      return this.models[
        this.modelType
      ]
    },
    albumTitle () {
      return this.albumData.title
    },
    albumData () {
      return this.modelData.album
    },
    modelData () {
      return this.eventData.model.data
    },
    albumArtistName () {
      return this.modelData.album.artist.name
    },
    artistName () {
      return this.modelData.artist.name
    },
    trackTitle () {
      return this.trackData.title
    },
    trackData () {
      return this.modelData.track
    },
    trackArtistName () {
      return this.trackData.artist.name
    },
    videoId () {
      return this.videoData.youtube_id
    },
    videoData () {
      return this.modelData.video
    },
    id () {
      return this.modelData.id
    },
    otherProfileId () {
      return this.otherProfileData.id
    },
    otherProfileData () {
      return this.modelData.other_profile
    },
    communityId () {
      return this.modelData.community.id
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
    videoTitle () {
      return this.videoData.title
    },
    title () {
      return this.modelData.title
    },
    otherProfileNickname () {
      return this.otherProfileData.nickname
    },
    text () {
      return (
        this.modelData.text || ''
      )
    },
    communityTitle () {
      return this.modelData.community.title
    },
    playlistTitle () {
      return this.modelData?.playlist?.title
    },
    playlistLink () {
      return formatProfilePlaylistLink(
        {
          profileId:
            this.profileId,
          playlistId:
            this.playlistId
        }
      )
    },
    playlistId () {
      return this.modelData?.playlist?.id
    }
  }
}
</script>

<style lang="sass" scoped></style>
