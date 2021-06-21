<template>
  <div
    class="ui right overlay sidebar queue-panel"
    ref="queuePanel"
  >
    <div class="ui segments main-segment-container">
      <HeaderSection />
      <TracksSection />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import HeaderSection from './TheQueuePanel/HeaderSection.vue'
import TracksSection from './TheQueuePanel/TracksSection.vue'
import { mainSidebarOptions } from '#/data/plugins/semantic'
import { setQueuePanel, hideQueuePanel } from '#/actions/layout'
import { setGlobalData } from '#/actions'

export default {
  name: 'TheQueuePanel',
  components: {
    HeaderSection,
    TracksSection
  },
  computed: {
    ...mapState('player', {
      playerPlaying: 'playing'
    }),
    ...mapGetters('queue', {
      queueTracksCount: 'tracksCount'
    }),
    queuePanelOptions () {
      return mainSidebarOptions({
        onVisible: this.handleVisible,
        onHide: this.handleHide
      })
    }
  },
  watch: {
    queueTracksCount: 'handleQueueTracksCountChange',
    playerPlaying: 'handlePlayerPlayingChange'
  },
  mounted () {
    setQueuePanel(
      this.$refs.queuePanel,
      this.queuePanelOptions
    )
  },
  methods: {
    ...mapActions('layout', [
      'setIsQueuePanelVisible'
    ]),
    handleVisible () {
      this.setIsQueuePanelVisible(true)
    },
    handleHide () {
      this.setIsQueuePanelVisible(false)
    },
    handleQueueTracksCountChange (value) {
      !value && hideQueuePanel()
    },
    handlePlayerPlayingChange (value) {
      !value && this.clearQueue()
    },
    clearQueue () {
      setGlobalData({
        'queue.currentTrackId': null,
        'queue.tracks': [],
        'queue.tracksShuffled': []
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.queue-panel
  width: 320px !important

.main-segment-container
  @extend .d-flex, .h-100
  .segment
    @extend .no-border-radius
    &.inverted
      border-left: $borderInverted
</style>
