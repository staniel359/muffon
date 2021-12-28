<template>
  <div
    :class="{
      active: isActive,
      disabled: isDisabled
    }"
    @click="handleClick"
  >
    <slot
      :isLoading="isLoading"
      :isError="!!error"
      :isCurrent="isCurrent"
    ></slot>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import getPlayerTrack from '#/actions/player/track/get'
import { updateStore, setPlayerPlaying } from '#/actions'
import { track as formatTrack } from '#/formatters/track'

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
    ...mapState('player', {
      playerCurrentTrackId: 'currentTrackId'
    }),
    ...mapState('audio', {
      audioElement: 'element'
    }),
    ...mapGetters('audio', {
      audioAction: 'action'
    }),
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
      return formatTrack({
        trackData: this.trackData,
        isFromSource: true
      })
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
        this.fetchAudio()
      }
    },
    callAudioAction () {
      this.audioElement[
        this.audioAction
      ]()
    },
    setAudio () {
      updateStore({
        'player.currentTrackId': this.trackId,
        'player.variants': [],
        'queue.tracks': this.queueTracks
      })

      setPlayerPlaying(
        this.trackFormatted
      )
    },
    getPlayerTrack,
    fetchAudio () {
      this.getPlayerTrack(
        this.playerTrackArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
