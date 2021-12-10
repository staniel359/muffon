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
        :artistName="artistName"
        :trackTitle="trackTitle"
        :isMore="isMoreTags"
      />

      <template v-if="description">
        <BaseDivider />

        <BaseTrackDescription
          :description="description"
          :artistName="artistName"
          :trackTitle="trackTitle"
          :isMore="isMoreDescription"
        />
      </template>
    </BaseSegmentContainer>
  </div>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BaseCounters from '@/BaseCounters.vue'
import BaseTrackTags from '@/models/track/BaseTrackTags.vue'
import BaseDivider from '@/BaseDivider.vue'
import BaseTrackDescription from '@/models/track/BaseTrackDescription.vue'

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
    }
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
      return this.trackData.with_more.tags
    },
    artistName () {
      return this.trackData.artist.name
    },
    trackTitle () {
      return this.trackData.title
    },
    description () {
      return this.trackData.description
    },
    isMoreDescription () {
      return this.trackData.with_more.description
    }
  }
}
</script>

<style lang="sass" scoped></style>
