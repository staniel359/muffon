<template>
  <BaseSegmentContainer
    ref="player"
    class="bottom overlay blurred sidebar the-player-panel no-padding"
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
    AudioSection
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

<style lang="sass" scoped></style>
