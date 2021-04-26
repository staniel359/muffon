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
  width: 320px !important

.main-segment-container
  @extend .d-flex, .h-100
  .segment
    @extend .no-border-radius
    &.inverted
      border-left: $borderInverted
</style>
