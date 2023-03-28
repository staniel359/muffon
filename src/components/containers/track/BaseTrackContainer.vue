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
  mapState
} from 'pinia'
import audioStore from '@/stores/audio'
import playerStore from '@/stores/player'
import getPlayerTrack from '@/helpers/actions/player/track/get'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'
import {
  setPlaying as setPlayerPlaying
} from '@/helpers/actions/player'
import {
  track as formatPlayerTrack
} from '@/helpers/formatters/player/track'

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
    isDisabled: Boolean,
    isFromRadio: Boolean,
    isExactTrack: Boolean
  },
  data () {
    return {
      isLoading: false,
      error: null
    }
  },
  computed: {
    ...mapState(
      audioStore,
      {
        audioElement: 'element',
        audioAction: 'action'
      }
    ),
    ...mapState(
      playerStore,
      {
        playerCurrentTrackId: 'currentTrackId',
        playerPlaying: 'playing'
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
          this.currentTrackId
      )
    },
    currentTrackId () {
      if (this.isExactTrack) {
        return this.playerPlaying?.player_id
      } else {
        return this.playerCurrentTrackId
      }
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
          isFromSource: this.isAudioPresent,
          isFromRadio: this.isFromRadio
        }
      )
    },
    isAudioPresent () {
      return this.audioData?.present
    },
    audioData () {
      return this.trackData.audio
    },
    audioLink () {
      return (
        this.audioData?.local?.path ||
          this.audioData?.link
      )
    },
    uuid () {
      return this.trackData.uuid
    }
  },
  methods: {
    getPlayerTrack,
    handleClick () {
      if (this.isCurrent) {
        this.callAudioAction()
      } else if (this.audioLink) {
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
          'queue.currentTrackId': this.uuid,
          'queue.tracks': this.queueTracks,
          'queue.isShuffle': false
        }
      )

      setPlayerPlaying(
        this.trackFormatted
      )
    },
    getAudio () {
      this.getPlayerTrack(
        this.playerTrackArgs
      )
    },
    getSourceAudio (
      {
        source
      }
    ) {
      this.getPlayerTrack(
        {
          source,
          ...this.playerTrackArgs
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
