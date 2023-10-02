<template>
  <div class="main-right-section middle-center-aligned-full-column">
    <div class="middle-aligned width-100">
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
      playerStore,
      {
        playerPlaying: 'playing'
      }
    ),
    ...mapState(
      queueStore,
      {
        isQueueAutoplay: 'isAutoplay',
        isQueueEnd: 'isEnd'
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
        this.isQueueAutoplay &&
          !this.isQueueEnd
      )
    },
    queueTrackArgs () {
      return {
        position: 'next'
      }
    }
  },
  watch: {
    playerPlaying:
      'handlePlayerPlayingChange',
    isQueueAutoplay:
      'handleIsQueueAutoplayChange'
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
    getQueueNextTrack () {
      this.getQueueTrack(
        this.queueTrackArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
