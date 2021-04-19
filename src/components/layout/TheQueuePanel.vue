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
import HeaderSection from './TheQueuePanel/HeaderSection.vue'
import TracksSection from './TheQueuePanel/TracksSection.vue'
import { setQueuePanel, setIsQueuePanelVisible } from '#/actions/layout'
import { mainSidebarOptions } from '#/data/plugins/semantic'

export default {
  name: 'TheQueuePanel',
  components: {
    HeaderSection,
    TracksSection
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
      setIsQueuePanelVisible(true)
    },
    handleHide () {
      setIsQueuePanelVisible(false)
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
