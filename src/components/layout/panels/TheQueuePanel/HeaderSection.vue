<template>
  <BaseSegmentContainer
    class="header-section"
    :is-change-transparency="false"
  >
    <ShuffleButton
      v-if="queueTracksCount"
    />

    <h4
      class="ui header main-header tracks-count-block"
      v-text="tracksCountText"
    />

    <BaseQueueOptionsDropdown
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
import BaseQueueOptionsDropdown
  from '@/components/dropdowns/queue/BaseQueueOptionsDropdown.vue'
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'HeaderSection',
  components: {
    BaseSegmentContainer,
    ShuffleButton,
    BaseQueueOptionsDropdown
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

.tracks-count-block
  @extend .flex-full, .text-align-center
</style>
