<template>
  <div
    ref="player"
    class="ui bottom overlay segment sidebar the-player-panel"
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
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import playerStore from '@/stores/player'
import AudioElement from './PlayerPanel/AudioElement.vue'
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
} from '@/helpers/formatters/semantic'
import {
  toggleClass
} from '@/helpers/actions/plugins/jquery'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'PlayerPanel',
  components: {
    AudioElement,
    PlayingPanel,
    AudioPanel,
    CloseButton
  },
  emits: [
    'visibilityChange'
  ],
  data () {
    return {
      key: null
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing'
      }
    ),
    playerPanelOptions () {
      return mainSidebarOptions(
        {
          onVisible: this.handleVisible,
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

        this.key = generateKey()
      } else {
        this.clearPlayer()

        hidePlayerPanel()
      }
    },
    async handleIsDarkModeChange () {
      await this.$nextTick()

      this.toggleInvertedClass()
    },
    handleVisible () {
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
