<template>
  <div
    :class="{
      active: isActive,
      disabled: isDisabled
    }"
    @click="handleClick"
  >
    <slot
      :is-loading="isLoading"
      :is-error="!!error"
      :is-current="isCurrent"
    />
  </div>
</template>

<script>
import {
  mapState,
  mapGetters
} from 'vuex'
import getPlayerTrack from '*/helpers/actions/player/track/get'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'
import {
  setPlaying as setPlayerPlaying
} from '*/helpers/actions/player'
import {
  track as formatPlayerTrack
} from '*/helpers/formatters/player/track'

export default {
  name: 'BaseTrackContainer',
  props: {
    trackData: {
      type: Object,
      required: true
    },
    queueTracks: {
      type: Array,
      default () {
        return []
      }
    },
    isWithActiveClass: Boolean,
    isDisabled: Boolean
  },
  data () {
    return {
      isLoading: false,
      error: null
    }
  },
  computed: {
    ...mapState(
      'player',
      {
        playerCurrentTrackId: 'currentTrackId'
      }
    ),
    ...mapState(
      'audio',
      {
        audioElement: 'element'
      }
    ),
    ...mapGetters(
      'audio',
      {
        audioAction: 'action'
      }
    ),
    isActive () {
      return (
        this.isWithActiveClass &&
          this.isCurrent &&
            !this.isDisabled
      )
    },
    isCurrent () {
      return (
        this.trackId ===
          this.playerCurrentTrackId
      )
    },
    trackId () {
      return this.trackData.player_id
    },
    playerTrackArgs () {
      return {
        trackData: this.trackFormatted,
        queueTracks: this.queueTracks
      }
    },
    trackFormatted () {
      return formatPlayerTrack(
        {
          trackData: this.trackData,
          isFromSource: true
        }
      )
    },
    trackAudioLink () {
      return this.trackData.audio?.link
    }
  },
  methods: {
    handleClick () {
      if (this.isCurrent) {
        this.callAudioAction()
      } else if (this.trackAudioLink) {
        this.setAudio()
      } else if (!this.isLoading) {
        this.getAudio()
      }
    },
    callAudioAction () {
      this.audioElement[
        this.audioAction
      ]()
    },
    setAudio () {
      updateGlobalStore(
        {
          'player.currentTrackId': this.trackId,
          'player.variants': [],
          'queue.tracks': this.queueTracks,
          'queue.isShuffle': false
        }
      )

      setPlayerPlaying(
        this.trackFormatted
      )
    },
    getPlayerTrack,
    getAudio () {
      this.getPlayerTrack(
        this.playerTrackArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
