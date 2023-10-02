<template>
  <div
    class="the-player-scrobble-point absolute height-100 middle-center-aligned"
    :class="{
      'd-none': isHidden
    }"
    :style="{
      [offsetDirection]:
        offsetPercentFormatted
    }"
  >
    <BaseIcon
      class="main-icon colored"
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
import layoutStore from '@/stores/layout'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import createScrobble from '@/helpers/actions/api/scrobbler/create'
import notificationMixin from '@/mixins/notificationMixin'
import {
  track as formatScrobblerTrack
} from '@/helpers/formatters/scrobbler'

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
    ...mapState(
      layoutStore,
      [
        'isRtl'
      ]
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
      return formatScrobblerTrack(
        {
          trackData: this.playerPlaying
        }
      )
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
      return `${this.artistName} - ${this.title}`
    },
    artistName () {
      return this.trackData.artistName
    },
    title () {
      return this.trackData.title
    },
    scrobbleArgs () {
      return {
        action: 'save',
        ...this.trackData
      }
    },
    offsetDirection () {
      if (this.isRtl) {
        return 'right'
      } else {
        return 'left'
      }
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
      createScrobble(
        this.scrobbleArgs
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

<style lang="sass" scoped></style>
