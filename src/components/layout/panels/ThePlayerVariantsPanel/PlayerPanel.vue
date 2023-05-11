<template>
  <BaseSegmentContainer
    ref="player"
    class="bottom overlay blurred sidebar player-panel"
    :class="{
      visible: playerPlaying
    }"
  >
    <AudioElement />

    <div
      v-if="playerPlaying"
      class="ui container main-container player-content-container"
    >
      <PlayingSection />

      <AudioSection />

      <CloseButton />
    </div>
  </BaseSegmentContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import AudioElement from './PlayerPanel/AudioElement.vue'
import PlayingSection from './PlayerPanel/PlayingSection.vue'
import AudioSection from './PlayerPanel/AudioSection.vue'
import CloseButton from './PlayerPanel/CloseButton.vue'
import {
  setPlayerPanel
} from '@/helpers/actions/layout'
import {
  mainSidebarOptions
} from '@/helpers/formatters/plugins/semantic'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'PlayerPanel',
  components: {
    BaseSegmentContainer,
    AudioElement,
    PlayingSection,
    AudioSection,
    CloseButton
  },
  computed: {
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing'
      }
    ),
    playerPanelOptions () {
      return mainSidebarOptions()
    }
  },
  watch: {
    playerPlaying:
      'handlePlayerPlayingChange'
  },
  mounted () {
    setPlayerPanel(
      this.$refs.player.$el,
      this.playerPanelOptions
    )
  },
  methods: {
    handlePlayerPlayingChange (
      value
    ) {
      if (!value) {
        this.clearPlayer()
      }
    },
    clearPlayer () {
      updateGlobalStore(
        {
          'player.currentTrackId': null,
          'player.currentVariantId': null,
          'player.variants': []
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.ui.sidebar
  &.player-panel
    @extend .no-padding, .no-border, .visibility-visible
    height: $playerPanelHeight !important
    overflow: visible !important
    z-index: 200 !important
    transition: transform 0.5s ease
    &.inverted
      border-top: $borderInverted !important

.player-content-container
  @extend .d-flex, .align-items-center, .h-100
  width: 720px !important
</style>
