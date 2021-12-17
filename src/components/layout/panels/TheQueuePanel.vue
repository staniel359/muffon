<template>
  <div
    class="ui right overlay sidebar the-queue-panel"
    ref="queuePanel"
  >
    <div class="ui raised segments main-segment-container">
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
import { updateStore } from '#/actions'

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
      if (!value) {
        hideQueuePanel()
      }
    },
    handlePlayerPlayingChange (value) {
      if (!value) {
        this.clearQueue()
      }
    },
    clearQueue () {
      updateStore({
        'queue.currentTrackId': null,
        'queue.tracks': [],
        'queue.tracksShuffled': []
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.the-queue-panel
  width: 320px !important

.main-segment-container
  @extend .d-flex, .h-100
  .segment
    @extend .no-border-radius
    &.inverted
      border-left: $borderInverted
</style>
