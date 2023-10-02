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
    PlaceholderSection
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

<style lang="sass" scoped></style>
