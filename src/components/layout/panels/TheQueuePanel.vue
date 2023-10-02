<template>
  <div
    ref="queuePanel"
    class="ui right overlay sidebar the-queue-panel"
  >
    <BaseSegmentsContainer
      class="d-flex height-100"
    >
      <HeaderSection
        class="section-segment"
      />

      <TracksSection
        class="section-segment"
      />
    </BaseSegmentsContainer>
  </div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'pinia'
import layoutStore from '@/stores/layout'
import queueStore from '@/stores/queue'
import BaseSegmentsContainer
  from '@/components/containers/segments/BaseSegmentsContainer.vue'
import HeaderSection from './TheQueuePanel/HeaderSection.vue'
import TracksSection from './TheQueuePanel/TracksSection.vue'
import {
  main as mainSidebarOptions
} from '@/helpers/formatters/plugins/semantic/options/sidebar'
import {
  setQueuePanel,
  hideQueuePanel
} from '@/helpers/actions/layout'

export default {
  name: 'TheQueuePanel',
  components: {
    BaseSegmentsContainer,
    HeaderSection,
    TracksSection
  },
  computed: {
    ...mapState(
      queueStore,
      {
        queueTracksCount: 'tracksCount'
      }
    ),
    queuePanelOptions () {
      return mainSidebarOptions(
        {
          onShow: this.handleShow,
          onHide: this.handleHide
        }
      )
    }
  },
  watch: {
    queueTracksCount:
      'handleQueueTracksCountChange'
  },
  mounted () {
    setQueuePanel(
      this.$refs.queuePanel,
      this.queuePanelOptions
    )
  },
  methods: {
    ...mapActions(
      layoutStore,
      [
        'setIsQueuePanelVisible'
      ]
    ),
    handleShow () {
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
@import '@/assets/styles/Shared.sass'

.the-queue-panel
  width: 400px !important

.section-segment
  @extend .no-border-radius
  &.inverted
    border-left: $borderInverted
</style>
