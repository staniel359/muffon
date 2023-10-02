<template>
  <BaseSegmentContainer
    class="blurred header-segment middle-aligned"
  >
    <div
      v-if="queueTracksCount"
      class="main-buttons-container"
    >
      <ShuffleButton />

      <LoopButton />
    </div>

    <h4
      class="ui header main-header flex-full text-align-center"
      v-text="tracksCountText"
    />

    <BaseQueueOptionsPopup
      v-if="queueTracksCount"
    />
  </BaseSegmentContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import queueStore from '@/stores/queue'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import ShuffleButton from './HeaderSegment/ShuffleButton.vue'
import LoopButton from './HeaderSegment/LoopButton.vue'
import BaseQueueOptionsPopup
  from '@/components/popups/queue/BaseQueueOptionsPopup.vue'
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'HeaderSegment',
  components: {
    BaseSegmentContainer,
    ShuffleButton,
    LoopButton,
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

<style lang="sass" scoped></style>
