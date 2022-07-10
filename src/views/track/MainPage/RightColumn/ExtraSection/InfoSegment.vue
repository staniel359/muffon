<template>
  <div class="ui basic segments">
    <BaseSegmentContainer>
      <BaseCounterLabels
        :counters="counters"
      />

      <BaseTrackTags
        :tags="tags"
        :request-track-data="requestTrackData"
        :is-more="isMoreTags"
      />

      <template v-if="description">
        <BaseDivider />

        <BaseTrackDescription
          :description="description"
          :request-track-data="requestTrackData"
          :is-more="isMoreDescription"
        />
      </template>
    </BaseSegmentContainer>
  </div>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseCounterLabels from '*/components/labels/BaseCounterLabels.vue'
import BaseTrackTags from '*/components/models/track/BaseTrackTags.vue'
import BaseDivider from '*/components/BaseDivider.vue'
import BaseTrackDescription
  from '*/components/models/track/BaseTrackDescription.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseCounterLabels,
    BaseTrackTags,
    BaseDivider,
    BaseTrackDescription
  },
  props: {
    trackData: {
      type: Object,
      required: true
    },
    requestTrackData: Object
  },
  computed: {
    counters () {
      return [
        {
          scope: 'listeners',
          count: this.listenersCount
        },
        {
          scope: 'plays',
          count: this.playsCount
        }
      ]
    },
    listenersCount () {
      return this.trackData.listeners_count
    },
    playsCount () {
      return this.trackData.plays_count
    },
    tags () {
      return this.trackData.tags
    },
    isMoreTags () {
      return this.trackData.with_more?.tags
    },
    description () {
      return this.trackData.description
    },
    isMoreDescription () {
      return this.trackData.with_more?.description
    }
  }
}
</script>

<style lang="sass" scoped></style>
