<template>
  <BaseSegmentContainer
    ref="player"
    class="bottom overlay blurred sidebar player-panel no-padding no-border visibility-visible overflow-visible height-player-panel"
    :class="{
      visible: playerPlaying
    }"
  >
    <AudioElement />

    <div
      v-if="playerPlaying"
      class="ui container main-container player-content-container middle-aligned height-100"
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
  main as mainSidebarOptions
} from '@/helpers/formatters/plugins/semantic/options/sidebar'
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
@import '@/assets/styles/Shared.sass'

.player-panel
  z-index: 200 !important
  transition: transform 0.5s ease
  &.inverted
    @extend .border-top-inverted

.player-content-container
  min-width: 750px !important
</style>
