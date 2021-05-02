<template>
  <VariantsPanel v-if="isRenderVariantsPanel" />

  <div
    class="ui bottom overlay segment sidebar player-panel"
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
import { mapState, mapGetters } from 'vuex'
import VariantsPanel from './ThePlayerPanel/VariantsPanel.vue'
import TrackPanel from './ThePlayerPanel/TrackPanel.vue'
import AudioPanel from './ThePlayerPanel/AudioPanel.vue'
import CloseButton from './ThePlayerPanel/CloseButton.vue'
import {
  setPlayerPanel,
  showPlayerPanel as show,
  hidePlayerPanel as hide
} from '#/actions/layout'
import { resetIsLoop as resetIsAudioLoop } from '#/actions/audio'
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
    playerPlaying: 'handlePlayerPlayingChange',
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
    handlePlayerPlayingChange (value) {
      value ? show() : hide()

      resetIsAudioLoop()
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
    }
  }
}
</script>

<style lang="sass" scoped>
.player-panel
  @extend .no-padding, .no-border
  overflow: visible !important
  z-index: 200 !important
  &.inverted
    border-top: $borderInverted !important

.main-container
  @extend .d-flex, .align-items-center
  height: $playerPanelHeight
</style>
