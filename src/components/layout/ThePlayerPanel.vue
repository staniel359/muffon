<template>
  <VariantsPanel v-if="isRenderVariantsPanel" />

  <div
    class="ui bottom overlay sidebar player-panel"
    ref="playerPanel"
  >
    <div class="player-panel-content">
      <div class="ui container main-container track-audio-container">
        <TrackPanel />
        <AudioPanel />
        <CloseButton />
      </div>
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
    playerPlaying: 'handlePlayerPlayingChange'
  },
  mounted () {
    setPlayerPanel(
      this.$refs.playerPanel,
      this.playerPanelOptions
    )
  },
  methods: {
    handleShow () {
      this.isVisible = true
    },
    handleHide () {
      this.isVisible = false
    },
    handlePlayerPlayingChange (value) {
      value ? show() : hide()

      resetIsAudioLoop()
    }
  }
}
</script>

<style lang="sass" scoped>
.player-panel
  overflow: visible !important
  z-index: 400 !important

.player-panel-content
  height: $playerPanelHeight
  background: white

.track-audio-container
  @extend .h-100, .d-flex, .align-items-center
</style>
