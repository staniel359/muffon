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
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import VariantsPanel from './ThePlayerPanel/VariantsPanel.vue'
import TrackPanel from './ThePlayerPanel/TrackPanel.vue'
import AudioPanel from './ThePlayerPanel/AudioPanel.vue'
import { setPlayerPanel } from '#/actions/layout'
import { updateTitle as updatePlayerTitle } from '#/actions/player'
import { resetIsLoop as resetIsAudioLoop } from '#/actions/audio'
import { mainSidebarOptions } from '#/data/plugins/semantic'

export default {
  name: 'ThePlayerPanel',
  components: {
    VariantsPanel,
    TrackPanel,
    AudioPanel
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
    ...mapState('audio', {
      audioStatus: 'status'
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
    playerPlaying: 'handlePlayerPlayingChange',
    audioStatus: 'handleAudioStatusChange'
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
    handleAudioStatusChange () {
      updatePlayerTitle()
    },
    handlePlayerPlayingChange () {
      resetIsAudioLoop()

      updatePlayerTitle()
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
  @extend .h-100, .d-flex
</style>
