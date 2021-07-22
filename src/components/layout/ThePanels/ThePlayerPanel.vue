<template>
  <VariantsPanel v-if="isRenderVariantsPanel" />

  <div
    class="ui bottom overlay segment sidebar the-player-panel"
    ref="playerPanel"
  >
    <div class="ui container main-container">
      <TrackPanel />
      <AudioPanel />
      <CloseButton />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import VariantsPanel from './ThePlayerPanel/VariantsPanel.vue'
import TrackPanel from './ThePlayerPanel/TrackPanel.vue'
import AudioPanel from './ThePlayerPanel/AudioPanel.vue'
import CloseButton from './ThePlayerPanel/CloseButton.vue'
import {
  setPlayerPanel,
  showPlayerPanel,
  hidePlayerPanel
} from '#/actions/layout'
import { setGlobalData } from '#/actions'
import { mainSidebarOptions } from '#/data/plugins/semantic'
import { toggleClass } from '#/actions/plugins/jquery'

export default {
  name: 'ThePlayerPanel',
  components: {
    VariantsPanel,
    TrackPanel,
    AudioPanel,
    CloseButton
  },
  data () {
    return {
      isVisible: false
    }
  },
  computed: {
    ...mapState('player', {
      playerPlaying: 'playing'
    }),
    ...mapState('layout', [
      'isDarkMode'
    ]),
    ...mapGetters('player', {
      playerVariantsCount: 'variantsCount'
    }),
    isRenderVariantsPanel () {
      return (
        this.isVisible &&
          this.playerVariantsCount
      )
    },
    playerPanelOptions () {
      return mainSidebarOptions({
        onShow: this.handleShow,
        onHide: this.handleHide
      })
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
      this.$refs.playerPanel,
      this.playerPanelOptions
    )
  },
  methods: {
    ...mapActions('audio', {
      setIsAudioLoop: 'setIsLoop'
    }),
    handlePlayerPlayingChange (value) {
      if (value) {
        this.$nextTick(() => {
          showPlayerPanel()
        })
      } else {
        this.clearPlayer()

        hidePlayerPanel()
      }

      this.setIsAudioLoop(false)
    },
    handleIsDarkModeChange () {
      this.$nextTick(() => {
        this.toggleInvertedClass()
      })
    },
    handleShow () {
      this.isVisible = true
    },
    handleHide () {
      this.isVisible = false
    },
    toggleInvertedClass () {
      toggleClass(
        this.$refs.playerPanel,
        'inverted',
        this.isDarkMode
      )
    },
    clearPlayer () {
      setGlobalData({
        'player.currentTrackId': null,
        'player.currentVariantId': null,
        'player.variants': []
      })
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

.main-container
  @extend .d-flex, .align-items-center
  height: $playerPanelHeight
</style>
