<template>
  <div class="audio-panel">
    <div class="top-section">
      <TimerPanel />

      <MainControlsPanel />

      <ExtraControlsPanel />
    </div>

    <div class="bottom-section">
      <ScrobblePoint
        v-if="isRenderScrobblePoint"
      />

      <SeekerPanel
        @audio-end="handleAudioEnd"
      />
    </div>
  </div>
</template>

<script>
import Mousetrap from 'mousetrap'
import {
  mapState
} from 'pinia'
import audioStore from '@/stores/audio'
import playerStore from '@/stores/player'
import profileStore from '@/stores/profile'
import queueStore from '@/stores/queue'
import TimerPanel from './AudioPanel/TimerPanel.vue'
import MainControlsPanel from './AudioPanel/MainControlsPanel.vue'
import ExtraControlsPanel from './AudioPanel/ExtraControlsPanel.vue'
import ScrobblePoint from './AudioPanel/ScrobblePoint.vue'
import SeekerPanel from './AudioPanel/SeekerPanel.vue'
import getQueueTrack from '@/helpers/actions/queue/track/get'

export default {
  name: 'AudioPanel',
  components: {
    TimerPanel,
    MainControlsPanel,
    ExtraControlsPanel,
    ScrobblePoint,
    SeekerPanel
  },
  computed: {
    ...mapState(
      audioStore,
      {
        audioElement: 'element',
        isAudioLoop: 'isLoop'
      }
    ),
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing',
        isPlayerWithScrobbling:
          'isWithScrobbling'
      }
    ),
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    ...mapState(
      queueStore,
      {
        isQueueAutoplay: 'isAutoplay',
        isQueueEnd: 'isEnd'
      }
    ),
    isGetQueueNextTrack () {
      return (
        this.isQueueAutoplay &&
          !this.isQueueEnd
      )
    },
    queueTrackArgs () {
      return {
        position: 'next'
      }
    },
    isRenderScrobblePoint () {
      return (
        this.profileId &&
          this.playerPlaying &&
          this.isPlayerWithScrobbling
      )
    },
    isGetRadioNextTrack () {
      return (
        this.isPlayingFromRadio &&
          !this.isAudioLoop
      )
    },
    isPlayingFromRadio () {
      return this.playerPlaying.from_radio
    }
  },
  watch: {
    isQueueAutoplay:
      'handleIsQueueAutoplayChange'
  },
  methods: {
    getQueueTrack,
    handleAudioEnd () {
      if (this.isGetQueueNextTrack) {
        this.getQueueNextTrack()
      } else if (this.isGetRadioNextTrack) {
        this.getRadioNextTrack()
      }
    },
    handleIsQueueAutoplayChange () {
      if (
        this.isGetQueueNextTrack &&
          this.audioElement.ended
      ) {
        this.getQueueNextTrack()
      }
    },
    getQueueNextTrack () {
      this.getQueueTrack(
        this.queueTrackArgs
      )
    },
    getRadioNextTrack () {
      Mousetrap.trigger(
        'shift+right'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.audio-panel
  @extend .flex-full, .d-flex, .flex-column, .align-items-center, .justify-content-center
  margin-left: 1em

.top-section
  @extend .d-flex, .align-items-center, .w-100

.bottom-section
  @extend .w-100, .relative
  margin-top: 0.5em
</style>
