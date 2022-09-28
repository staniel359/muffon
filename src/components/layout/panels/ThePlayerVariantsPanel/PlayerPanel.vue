<template>
  <div
    ref="player"
    class="ui bottom overlay segment sidebar the-player-panel"
  >
    <div class="ui container main-container player-content-container">
      <PlayingPanel />

      <AudioPanel />

      <CloseButton />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import PlayingPanel from './PlayerPanel/PlayingPanel.vue'
import AudioPanel from './PlayerPanel/AudioPanel.vue'
import CloseButton from './PlayerPanel/CloseButton.vue'
import {
  setPlayerPanel,
  showPlayerPanel,
  hidePlayerPanel
} from '@/helpers/actions/layout'
import {
  mainSidebarOptions
} from '@/helpers/data/plugins/semantic'
import {
  toggleClass
} from '@/helpers/actions/plugins/jquery'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'

export default {
  name: 'PlayerPanel',
  components: {
    PlayingPanel,
    AudioPanel,
    CloseButton
  },
  emits: [
    'visibilityChange'
  ],
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    ),
    ...mapState(
      'player',
      {
        playerPlaying: 'playing'
      }
    ),
    playerPanelOptions () {
      return mainSidebarOptions(
        {
          onShow: this.handleShow,
          onHide: this.handleHide
        }
      )
    }
  },
  watch: {
    playerPlaying: {
      immediate: true,
      handler: 'handlePlayerPlayingChange'
    },
    isDarkMode: {
      immediate: true,
      handler: 'handleIsDarkModeChange'
    }
  },
  mounted () {
    setPlayerPanel(
      this.$refs.player,
      this.playerPanelOptions
    )
  },
  methods: {
    async handlePlayerPlayingChange (
      value
    ) {
      await this.$nextTick()

      if (value) {
        showPlayerPanel()
      } else {
        this.clearPlayer()

        hidePlayerPanel()
      }
    },
    async handleIsDarkModeChange () {
      await this.$nextTick()

      this.toggleInvertedClass()
    },
    handleShow () {
      this.$emit(
        'visibilityChange',
        true
      )
    },
    handleHide () {
      this.$emit(
        'visibilityChange',
        false
      )
    },
    toggleInvertedClass () {
      toggleClass(
        this.$refs.player,
        'inverted',
        this.isDarkMode
      )
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
  @extend .no-padding, .no-border
  overflow: visible !important
  z-index: 200 !important
  &.inverted
    border-top: $borderInverted !important

.player-content-container
  @extend .d-flex, .align-items-center
  height: $playerPanelHeight
</style>
