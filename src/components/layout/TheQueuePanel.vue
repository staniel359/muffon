<template>
  <div
    class="ui right overlay sidebar queue-panel"
    ref="queuePanel"
  >
    <div class="queue-panel-content">
      <HeaderSection />

      <div class="ui divider main-divider"></div>

      <TracksSection />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HeaderSection from './TheQueuePanel/HeaderSection.vue'
import TracksSection from './TheQueuePanel/TracksSection.vue'
import { mainSidebarOptions } from '#/data/plugins/semantic'
import {
  setQueuePanel,
  setIsQueuePanelVisible as setIsVisible,
  hideQueuePanel as hide
} from '#/actions/layout'

export default {
  name: 'TheQueuePanel',
  components: {
    HeaderSection,
    TracksSection
  },
  computed: {
    ...mapGetters('queue', {
      queueTracksCount: 'tracksCount'
    })
  },
  watch: {
    queueTracksCount: 'handleQueueTracksCountChange'
  },
  mounted () {
    setQueuePanel(
      this.$refs.queuePanel,
      mainSidebarOptions({
        onVisible: this.handleVisible,
        onHide: this.handleHide
      })
    )
  },
  methods: {
    handleVisible () {
      setIsVisible(true)
    },
    handleHide () {
      setIsVisible(false)
    },
    handleQueueTracksCountChange (value) {
      !value && hide()
    }
  }
}
</script>

<style lang="sass" scoped>
.queue-panel
  @extend .overflow-hidden
  z-index: 300 !important
  padding: $navbarHeight 0 $playerPanelHeight 0
  width: 325px !important
  background: white

.queue-panel-content
  @extend .d-flex, .flex-column, .h-100

.main-divider
  @extend .no-margin
</style>
