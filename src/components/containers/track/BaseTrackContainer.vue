<template>
  <div
    ref="track"
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
import {
  focusOnListElement,
  focusOnPageElement
} from '@/helpers/actions/layout'

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
    isClickable: {
      type: Boolean,
      default: true
    },
    isWithActiveClass: Boolean,
    isDisabled: Boolean,
    isFromRadio: Boolean,
    isExactTrack: Boolean,
    isFocusable: Boolean,
    isSegment: Boolean,
    scrollable: HTMLDivElement
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
        playerPlaying: 'playing',
        isPlayerWithPlayingFocus:
          'isWithPlayingFocus'
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
      return this.audioData?.link
    },
    uuid () {
      return this.trackData.uuid
    },
    isFocusActive () {
      return (
        this.isFocus &&
          this.isActive
      )
    },
    isFocus () {
      return (
        this.isFocusable &&
          this.isPlayerWithPlayingFocus
      )
    }
  },
  watch: {
    isFocusActive:
      'handleIsFocusActiveChange'
  },
  methods: {
    getPlayerTrack,
    handleClick () {
      if (this.isClickable) {
        if (this.isCurrent) {
          this.callAudioAction()
        } else if (this.audioLink) {
          this.setAudio()
        } else if (!this.isLoading) {
          this.getAudio()
        }

        if (this.isFocus) {
          this.focus()
        }
      }
    },
    async handleIsFocusActiveChange (
      value
    ) {
      if (value) {
        await this.$nextTick()

        this.focus()
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
    },
    focus () {
      if (this.isSegment) {
        this.focusList()
      } else {
        this.focusPage()
      }
    },
    focusList () {
      focusOnListElement(
        this.$refs.track,
        this.scrollable
      )
    },
    focusPage () {
      focusOnPageElement(
        this.$refs.track
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
