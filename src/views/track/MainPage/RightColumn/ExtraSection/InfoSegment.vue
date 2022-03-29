<template>
  <div class="ui basic segments">
    <BaseSegmentContainer>
      <BaseCounters
        :listenersCount="listenersCount"
        :playsCount="playsCount"
      />

      <BaseTrackTags
        v-if="isAnyTags"
        :tags="tags"
        :requestTrackData="requestTrackData"
        :isMore="isMoreTags"
      />

      <template v-if="description">
        <BaseDivider />

        <BaseTrackDescription
          :description="description"
          :requestTrackData="requestTrackData"
          :isMore="isMoreDescription"
        />
      </template>
    </BaseSegmentContainer>
  </div>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseCounters from '*/components/BaseCounters.vue'
import BaseTrackTags from '*/components/models/track/BaseTrackTags.vue'
import BaseDivider from '*/components/BaseDivider.vue'
import BaseTrackDescription
  from '*/components/models/track/BaseTrackDescription.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseCounters,
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
    listenersCount () {
      return this.trackData.listeners_count
    },
    playsCount () {
      return this.trackData.plays_count
    },
    isAnyTags () {
      return this.tags?.length
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
