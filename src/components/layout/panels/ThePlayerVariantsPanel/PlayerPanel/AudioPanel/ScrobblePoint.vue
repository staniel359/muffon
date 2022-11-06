<template>
  <div
    v-if="isRender"
    class="scrobble-point"
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
  mapGetters,
  mapState
} from 'vuex'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import createScrobblerPlay
  from '@/helpers/actions/api/lastfm/scrobbler/play/create'
import createScrobblerSave
  from '@/helpers/actions/api/lastfm/scrobbler/save/create'
import {
  setToast
} from '@/helpers/actions/plugins/semantic'

export default {
  name: 'ScrobblePoint',
  components: {
    BaseIcon
  },
  data () {
    return {
      audioCurrentTime: 0,
      seekedTime: 0
    }
  },
  computed: {
    ...mapGetters(
      'profile',
      {
        profileId: 'id'
      }
    ),
    ...mapState(
      'audio',
      {
        audioDuration: 'duration',
        audioElement: 'element'
      }
    ),
    ...mapState(
      'player',
      {
        isPlayerWithScrobbleNotifications:
          'isWithScrobbleNotifications',
        isPlayerWithScrobbling: 'isWithScrobbling',
        playerPlaying: 'playing',
        playerScrobblePercent: 'scrobblePercent'
      }
    ),
    isRender () {
      return (
        this.isToScrobble && (
          this.scrobblePercent < 100
        )
      )
    },
    isToScrobble () {
      return (
        this.profileId &&
          this.playerPlaying &&
          this.isPlayerWithScrobbling
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
        this.isToScrobble &&
          this.isScrobbled
      )
    },
    isScrobbled () {
      return (
        this.audioCurrentPercent >
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
    notificationData () {
      return {
        message: this.scrobbledMessage,
        icon: 'green check'
      }
    },
    scrobbledMessage () {
      return this.$t(
        'notifications.scrobbled',
        {
          trackFullTitle:
            this.trackFullTitleStrong
        }
      )
    },
    trackFullTitleStrong () {
      return `<strong>${this.trackFullTitle}</strong>`
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
    playerPlaying: {
      immediate: true,
      handler: 'handlePlayerPlayingChange'
    },
    isPlayerWithScrobbling:
      'handleIsPlayerWithScrobblingChange',
    isToSaveScrobble:
      'handleIsToSaveScrobbleChange'
  },
  mounted () {
    this.audioElement.onseeking =
      this.handleAudioSeeking

    this.audioElement.ontimeupdate =
      this.handleAudioTimeUpdate
  },
  methods: {
    handlePlayerPlayingChange () {
      if (this.isToScrobble) {
        this.playScrobble()
      }
    },
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
        this.notify()
      }
    },
    playScrobble () {
      createScrobblerPlay(
        this.trackData
      )
    },
    saveScrobble () {
      createScrobblerSave(
        this.trackData
      ).then(
        this.handleSaveScrobbleSuccess
      )
    },
    notify () {
      setToast(
        this.notificationData
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
</style>
