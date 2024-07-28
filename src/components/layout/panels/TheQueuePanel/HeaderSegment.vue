<template>
  <BaseSegmentContainer
    class="header-segment middle-aligned"
  >
    <div class="main-buttons-container queue-actions">
      <ActionsBlock
        v-if="queueTracksCount"
      />
    </div>

    <BaseHeader
      class="text-align-center queue-header"
      tag="h4"
      :text="tracksCountText"
    />

    <div class="queue-options text-align-right">
      <BaseQueueOptionsPopup
        v-if="queueTracksCount"
      />
    </div>
  </BaseSegmentContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import queueStore from '@/stores/queue'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import ActionsBlock from './HeaderSegment/ActionsBlock.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseQueueOptionsPopup
  from '@/components/popups/queue/BaseQueueOptionsPopup.vue'
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'HeaderSegment',
  components: {
    BaseSegmentContainer,
    ActionsBlock,
    BaseHeader,
    BaseQueueOptionsPopup
  },
  computed: {
    ...mapState(
      queueStore,
      {
        queueTracksCount: 'tracksCount'
      }
    ),
    tracksCountText () {
      return this.$tc(
        'counters.nominative.tracks',
        this.queueTracksCount,
        {
          count:
            this.queueTracksCountFormatted
        }
      )
    },
    queueTracksCountFormatted () {
      return formatNumber(
        this.queueTracksCount
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.queue-actions,
.queue-options
  flex: 0.25

.queue-header
  flex: 0.5
</style>
