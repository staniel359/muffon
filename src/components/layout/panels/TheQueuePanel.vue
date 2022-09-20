<template>
  <div
    ref="queuePanel"
    :class="[
      'ui right overlay sidebar',
      'the-queue-panel'
    ]"
  >
    <div
      :class="[
        'ui raised segments',
        'main-segment-container'
      ]"
    >
      <HeaderSection />

      <TracksSection />
    </div>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import HeaderSection from './TheQueuePanel/HeaderSection.vue'
import TracksSection from './TheQueuePanel/TracksSection.vue'
import {
  mainSidebarOptions
} from '@/helpers/data/plugins/semantic'
import {
  setQueuePanel,
  hideQueuePanel
} from '@/helpers/actions/layout'

export default {
  name: 'TheQueuePanel',
  components: {
    HeaderSection,
    TracksSection
  },
  computed: {
    ...mapGetters(
      'queue',
      {
        queueTracksCount: 'tracksCount'
      }
    ),
    queuePanelOptions () {
      return mainSidebarOptions(
        {
          onVisible: this.handleVisible,
          onHide: this.handleHide
        }
      )
    }
  },
  watch: {
    queueTracksCount: 'handleQueueTracksCountChange'
  },
  mounted () {
    setQueuePanel(
      this.$refs.queuePanel,
      this.queuePanelOptions
    )
  },
  methods: {
    ...mapActions(
      'layout',
      [
        'setIsQueuePanelVisible'
      ]
    ),
    handleVisible () {
      this.setIsQueuePanelVisible(
        true
      )
    },
    handleHide () {
      this.setIsQueuePanelVisible(
        false
      )
    },
    handleQueueTracksCountChange (
      value
    ) {
      if (!value) {
        hideQueuePanel()
      }
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
