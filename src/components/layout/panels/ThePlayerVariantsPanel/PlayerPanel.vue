<template>
  <BaseSegmentContainer
    ref="player"
    class="bottom overlay blurred sidebar the-player-panel"
    :class="{
      visible: playerPlaying
    }"
  >
    <div class="ui container main-container player-content-container">
      <AudioElement />

      <template
        v-if="playerPlaying"
      >
        <PlayingPanel />

        <AudioPanel
          :key="key"
        />

        <CloseButton />
      </template>
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
import PlayingPanel from './PlayerPanel/PlayingPanel.vue'
import AudioPanel from './PlayerPanel/AudioPanel.vue'
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
import {
  generateKey,
  isObjectChanged
} from '@/helpers/utils'

export default {
  name: 'PlayerPanel',
  components: {
    BaseSegmentContainer,
    AudioElement,
    PlayingPanel,
    AudioPanel,
    CloseButton
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
      value,
      oldValue
    ) {
      if (value) {
        const isChanged =
          isObjectChanged(
            value,
            oldValue
          )

        if (isChanged) {
          this.key = generateKey()
        }
      } else {
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
.the-player-panel
  @extend .no-padding, .no-border, .visibility-visible
  overflow: visible !important
  z-index: 200 !important
  transition: transform 0.5s ease
  &.inverted
    border-top: $borderInverted !important

.player-content-container
  @extend .d-flex, .align-items-center
  height: $playerPanelHeight
</style>
