<template>
  <div
    ref="queuePanel"
    class="ui right overlay sidebar the-queue-panel"
  >
    <BaseSegmentsContainer
      class="d-flex height-100"
    >
      <HeaderSegment
        class="section-segment"
      />

      <TracksSegment
        class="section-segment"
      />

      <PlaceholderSection />
    </BaseSegmentsContainer>
  </div>

  <BaseDimmer
    ref="dimmer"
    class="queue-panel-dimmer"
    @click="handleDimmerClick"
  />
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
import HeaderSegment from './TheQueuePanel/HeaderSegment.vue'
import TracksSegment from './TheQueuePanel/TracksSegment.vue'
import PlaceholderSection from './TheQueuePanel/PlaceholderSection.vue'
import BaseDimmer from '@/components/BaseDimmer.vue'
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
    HeaderSegment,
    TracksSegment,
    PlaceholderSection,
    BaseDimmer
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
      this.setVisible(
        true
      )
    },
    handleHide () {
      this.setVisible(
        false
      )
    },
    handleQueueTracksCountChange (
      value
    ) {
      if (!value) {
        hideQueuePanel()
      }
    },
    handleDimmerClick () {
      hideQueuePanel()
    },
    setVisible (
      value
    ) {
      this.setIsQueuePanelVisible(
        value
      )

      this.toggleDimmer(
        value
      )
    },
    toggleDimmer (
      value
    ) {
      this.$refs
        .dimmer
        .toggle(
          value
        )
    }
  }
}
</script>

<style lang="sass" scoped>
.queue-panel-dimmer
  z-index: 100
</style>
