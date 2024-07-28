<template>
  <BaseSegmentContainer
    ref="segment"
    class="track-segment"
    :is-loading="isLoading"
    :error="error"
    @init="handleInit"
    @refresh="handleRefresh"
  >
    <div class="main-columns-container">
      <LeftColumn
        v-if="scrollable"
        :track-data="trackData"
        :scrollable="scrollable"
      />

      <RightColumn
        :track-data="trackData"
        :request-track-data="requestTrackData"
      />
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import LeftColumn from './TrackSegment/LeftColumn.vue'
import RightColumn from './TrackSegment/RightColumn.vue'

export default {
  name: 'TrackSegment',
  components: {
    BaseSegmentContainer,
    LeftColumn,
    RightColumn
  },
  props: {
    trackData: {
      type: Object,
      required: true
    },
    requestTrackData: Object,
    isLoading: Boolean,
    error: Error
  },
  emits: [
    'refresh'
  ],
  data () {
    return {
      scrollable: null
    }
  },
  watch: {
    trackData: 'handleTrackDataChange'
  },
  methods: {
    handleTrackDataChange () {
      this.focus()
    },
    handleInit (
      element
    ) {
      this.scrollable = element
    },
    handleRefresh () {
      this.$emit(
        'refresh'
      )
    },
    focus () {
      this.$refs
        .segment
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped>
.track-segment
  z-index: 1
</style>
