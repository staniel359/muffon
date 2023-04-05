<template>
  <div
    class="scrobble-point"
    :class="{
      hidden: isHidden
    }"
    :style="{
      left: offsetPercentFormatted
    }"
  >
    <BaseIcon
      icon="lastfm"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import audioStore from '@/stores/audio'
import playerStore from '@/stores/player'
import profileStore from '@/stores/profile'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import createScrobblerSave
  from '@/helpers/actions/api/lastfm/scrobbler/save/create'
import notificationMixin from '@/mixins/notificationMixin'

export default {
  name: 'ScrobblePoint',
  components: {
    BaseIcon
  },
  mixins: [
    notificationMixin
  ],
  data () {
    return {
      audioCurrentTime: 0,
      seekedTime: 0
    }
  },
  computed: {
    ...mapState(
      audioStore,
      {
        audioDuration: 'duration',
        audioElement: 'element'
      }
    ),
    ...mapState(
      playerStore,
      {
        isPlayerWithScrobbleNotifications:
          'isWithScrobbleNotifications',
        isPlayerWithScrobbling: 'isWithScrobbling',
        playerPlaying: 'playing',
        playerScrobblePercent: 'scrobblePercent'
      }
    ),
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    isHidden () {
      return (
        this.scrobblePercent > 100
      )
    },
    offsetPercentFormatted () {
      return `${this.scrobblePercent}%`
    },
    trackData () {
      return {
        title: this.trackTitle,
        artistName: this.artistName,
        albumTitle: this.albumTitle,
        duration: this.duration
      }
    },
    trackTitle () {
      return this.playerPlaying.title
    },
    artistName () {
      return this.playerPlaying.artist.name
    },
    albumTitle () {
      return this.playerPlaying.album?.title
    },
    duration () {
      return this.playerPlaying.duration
    },
    isToSaveScrobble () {
      return (
        this.audioCurrentPercent >=
          this.scrobblePercent
      )
    },
    audioCurrentPercent () {
      return (
        this.audioCurrentTime * 100 /
          this.audioDuration
      ) || 0
    },
    scrobblePercent () {
      return (
        this.playerScrobblePercent +
          this.seekedPercent
      )
    },
    seekedPercent () {
      return (
        this.seekedTime * 100 /
          this.audioDuration
      ) || 0
    },
    notificationSuccessMessage () {
      return this.$t(
        'notifications.scrobbled',
        {
          trackFullTitle:
            this.trackFullTitleStrong
        }
      )
    },
    trackFullTitleStrong () {
      return `
        <strong>
          ${this.trackFullTitle}
        </strong>
      `
    },
    trackFullTitle () {
      return [
        this.artistName,
        this.trackTitle
      ].join(
        ' - '
      )
    }
  },
  watch: {
    isPlayerWithScrobbling:
      'handleIsPlayerWithScrobblingChange',
    isToSaveScrobble:
      'handleIsToSaveScrobbleChange'
  },
  mounted () {
    this.audioElement
      .addEventListener(
        'seeking',
        this.handleAudioSeeking
      )

    this.audioElement
      .addEventListener(
        'timeupdate',
        this.handleAudioTimeUpdate
      )
  },
  methods: {
    handleIsPlayerWithScrobblingChange (
      value
    ) {
      if (value) {
        this.setScrobblingEnabledTime()
      }
    },
    handleIsToSaveScrobbleChange (
      value
    ) {
      if (value) {
        this.saveScrobble()
      }
    },
    handleAudioSeeking () {
      this.setSeekingTime()
    },
    handleAudioTimeUpdate () {
      setTimeout(
        this.setUpdatedTime,
        0
      )
    },
    handleSaveScrobbleSuccess () {
      if (this.isPlayerWithScrobbleNotifications) {
        this.notifySuccess()
      }
    },
    saveScrobble () {
      createScrobblerSave(
        this.trackData
      ).then(
        this.handleSaveScrobbleSuccess
      )
    },
    setScrobblingEnabledTime () {
      const {
        currentTime
      } = this.audioElement

      this.seekedTime = currentTime
    },
    setSeekingTime () {
      const {
        currentTime
      } = this.audioElement

      this.seekedTime = currentTime
      this.audioCurrentTime = currentTime
    },
    setUpdatedTime () {
      const {
        currentTime
      } = this.audioElement

      if (!currentTime) {
        this.seekedTime = 0
      }

      this.audioCurrentTime = currentTime
    }
  }
}
</script>

<style lang="sass" scoped>
.scrobble-point
  @extend .absolute, .h-100, .d-flex, .align-items-center, .justify-content-center
  width: 25px
  border-left: 1px solid $colorLastfm
  z-index: 10
  .icon
    @extend .no-margin
    color: $colorLastfm
  &.hidden
    @extend .d-none
</style>
