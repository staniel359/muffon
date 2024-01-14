<template>
  <div class="main-right-section middle-center-aligned-full-column">
    <div
      class="middle-aligned width-100"
      :dir="controlsDirection"
    >
      <LeftControlsSection
        :key="key"
      />

      <CenterControlsSection />

      <RightControlsSection
        :key="key"
      />
    </div>

    <BottomSection />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import playerStore from '@/stores/player'
import queueStore from '@/stores/queue'
import audioStore from '@/stores/audio'
import LeftControlsSection from './AudioSection/LeftControlsSection.vue'
import CenterControlsSection from './AudioSection/CenterControlsSection.vue'
import RightControlsSection from './AudioSection/RightControlsSection.vue'
import BottomSection from './AudioSection/BottomSection.vue'
import getQueueTrack from '@/helpers/actions/queue/track/get'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'AudioSection',
  components: {
    LeftControlsSection,
    CenterControlsSection,
    RightControlsSection,
    BottomSection
  },
  data () {
    return {
      key: null
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isRtl'
      ]
    ),
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing'
      }
    ),
    ...mapState(
      queueStore,
      {
        isQueueAutoplay: 'isAutoplay',
        isQueueEnd: 'isEnd',
        isQueueLoop: 'isLoop'
      }
    ),
    ...mapState(
      audioStore,
      {
        audioElement: 'element'
      }
    ),
    isGetQueueNextTrack () {
      return (
        this.isQueueAutoplay && (
          this.isQueueLoop ||
            !this.isQueueEnd
        )
      )
    },
    queueTrackArgs () {
      return {
        position: 'next'
      }
    },
    controlsDirection () {
      return (
        this.isRtl ? 'rtl' : 'ltr'
      )
    }
  },
  watch: {
    playerPlaying:
      'handlePlayerPlayingChange',
    isQueueAutoplay:
      'handleIsQueueAutoplayChange',
    isQueueLoop:
      'handleIsQueueLoopChange'
  },
  methods: {
    getQueueTrack,
    handlePlayerPlayingChange () {
      this.key = generateKey()
    },
    handleIsQueueAutoplayChange () {
      const isGetQueueNextTrack = (
        this.isGetQueueNextTrack &&
          this.audioElement.ended
      )

      if (isGetQueueNextTrack) {
        this.getQueueNextTrack()
      }
    },
    handleIsQueueLoopChange () {
      const isGetQueueNextTrack = (
        this.isGetQueueNextTrack &&
          this.audioElement.ended
      )

      if (isGetQueueNextTrack) {
        this.getQueueNextTrack()
      }
    },
    getQueueNextTrack () {
      this.getQueueTrack(
        this.queueTrackArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
