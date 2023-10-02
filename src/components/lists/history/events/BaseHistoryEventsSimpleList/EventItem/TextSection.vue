<template>
  <i18n-t
    tag="div"
    scope="global"
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
  main as formatAlbumLink
} from '@/helpers/formatters/links/album'
import {
  main as formatArtistLink
} from '@/helpers/formatters/links/artist'
import {
  main as formatTrackLink
} from '@/helpers/formatters/links/track'
import {
  main as formatVideoLink
} from '@/helpers/formatters/links/video'
import {
  main as formatVideoPlaylistLink
} from '@/helpers/formatters/links/videoPlaylist'
import {
  main as formatVideoChannelLink
} from '@/helpers/formatters/links/videoChannel'
import {
  main as formatCommunityLink
} from '@/helpers/formatters/links/community'
import {
  main as formatProfileLink,
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
        bookmarkVideoPlaylist: 'videoPlaylist',
        bookmarkVideoChannel: 'videoChannel',
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
        postComment: 'comment',
        profile: 'profile',
        recommendationArtist:
          'recommendationArtist',
        recommendationTrack:
          'recommendationTrack',
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
          return formatAlbumLink(
            {
              albumTitle:
                this.albumTitle,
              artistName:
                this.albumArtistName
            }
          )
        case 'artist':
          return formatArtistLink(
            {
              artistName:
                this.artistName
            }
          )
        case 'track':
          return formatTrackLink(
            {
              trackTitle:
                this.trackTitle,
              artistName:
                this.trackArtistName
            }
          )
        case 'playlistTrack':
          return formatTrackLink(
            {
              trackTitle:
                this.trackTitle,
              artistName:
                this.trackArtistName
            }
          )
        case 'video':
          return formatVideoLink(
            {
              videoId: this.videoId
            }
          )
        case 'videoPlaylist':
          return formatVideoPlaylistLink(
            {
              playlistId: this.videoPlaylistId
            }
          )
        case 'videoChannel':
          return formatVideoChannelLink(
            {
              channelId: this.videoChannelId
            }
          )
        case 'community':
          return formatCommunityLink(
            {
              communityId: this.id
            }
          )
        case 'recommendationArtist':
          return formatArtistLink(
            {
              artistName:
                this.artistName
            }
          )
        case 'recommendationTrack':
          return formatTrackLink(
            {
              trackTitle:
                this.trackTitle,
              artistName:
                this.trackArtistName
            }
          )
        case 'relationship':
          return formatProfileLink(
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
          return formatProfileLink(
            {
              profileId:
                this.otherProfileId
            }
          )
        case 'membership':
          return formatCommunityLink(
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
    videoChannelId () {
      return this.videoChannelData.youtube_id
    },
    videoChannelData () {
      return this.modelData.video_channel
    },
    videoPlaylistId () {
      return this.videoPlaylistData.youtube_id
    },
    videoPlaylistData () {
      return this.modelData.video_playlist
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
        case 'videoChannel':
          return this.videoChannelTitle
        case 'videoPlaylist':
          return this.videoPlaylistTitle
        case 'community':
          return this.title
        case 'recommendationArtist':
          return this.artistName
        case 'recommendationTrack':
          return [
            this.trackArtistName,
            this.trackTitle
          ].join(
            ' - '
          )
        case 'relationship':
          return this.otherProfileNickname
        case 'post':
          return this.text
        case 'comment':
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
    videoChannelTitle () {
      return this.videoChannelData.title
    },
    videoPlaylistTitle () {
      return this.videoPlaylistData.title
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
