<template>
  <BaseSegmentContainer
    class="blurred header-section"
  >
    <div
      v-if="queueTracksCount"
    >
      <ShuffleButton
        class="action-button"
      />

      <LoopButton
        class="action-button"
      />
    </div>

    <h4
      class="ui header main-header tracks-count-block"
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
import ShuffleButton from './HeaderSection/ShuffleButton.vue'
import LoopButton from './HeaderSection/LoopButton.vue'
import BaseQueueOptionsPopup
  from '@/components/popups/queue/BaseQueueOptionsPopup.vue'
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'HeaderSection',
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

<style lang="sass" scoped>
.header-section
  @extend .d-flex, .align-items-center
  padding: calc(#{$navbarHeight} + 1em) 1em 1em 1em

[dir="ltr"]
  .action-button
    &:not(:first-child)
      margin-left: 0.75em !important
[dir="rtl"]
  .action-button
    &:not(:first-child)
      margin-right: 0.75em !important

.tracks-count-block
  @extend .flex-full, .text-align-center
</style>
