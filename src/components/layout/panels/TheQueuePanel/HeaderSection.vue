<template>
  <BaseSegmentContainer
    class="header-section"
  >
    <ShuffleButton
      v-if="queueTracksCount"
    />

    <h4
      :class="[
        'ui header main-header',
        'tracks-count-block'
      ]"
      v-text="tracksText"
    />

    <BaseClearButton
      v-if="queueTracksCount"
      @click="handleClearButtonClick"
    />
  </BaseSegmentContainer>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import ShuffleButton from './HeaderSection/ShuffleButton.vue'
import BaseClearButton from '*/components/buttons/BaseClearButton.vue'
import {
  number as formatNumber
} from '*/helpers/formatters'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

export default {
  name: 'HeaderSection',
  components: {
    BaseSegmentContainer,
    ShuffleButton,
    BaseClearButton
  },
  computed: {
    ...mapGetters(
      'queue',
      {
        queueTracksCount: 'tracksCount'
      }
    ),
    tracksText () {
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
  },
  methods: {
    handleClearButtonClick () {
      updateGlobalStore(
        {
          'queue.currentTrackId': null,
          'queue.tracks': [],
          'queue.tracksShuffled': [],
          'queue.isShuffle': false
        }
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
