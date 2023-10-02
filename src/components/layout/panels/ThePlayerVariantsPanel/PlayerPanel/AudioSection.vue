<template>
  <div class="main-right-section middle-center-aligned-full-column">
    <div class="middle-aligned width-100">
      <LeftControlsSection />

      <CenterControlsSection />

      <RightControlsSection
        :key="key"
      />
    </div>

    <div class="main-bottom-extrasmall-section width-100 relative">
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
import hotkeys from 'hotkeys-js'
import {
  mapState
} from 'pinia'
import audioStore from '@/stores/audio'
import playerStore from '@/stores/player'
import profileStore from '@/stores/profile'
import queueStore from '@/stores/queue'
import LeftControlsSection from './AudioSection/LeftControlsSection.vue'
import CenterControlsSection from './AudioSection/CenterControlsSection.vue'
import RightControlsSection from './AudioSection/RightControlsSection.vue'
import ScrobblePoint from './AudioSection/ScrobblePoint.vue'
import SeekerPanel from './AudioSection/SeekerPanel.vue'
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
    ScrobblePoint,
    SeekerPanel
  },
  data () {
    return {
      key: null
    }
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
      hotkeys.trigger(
        'shift+right'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
