<template>
  <BaseSegmentContainer
    class="raised main-segment-container"
  >
    <BaseHeader
      class="main-artist-name"
      tag="h1"
      :text="artistName"
    />

    <BaseCounters
      :listenersCount="listenersCount"
      :playsCount="playsCount"
    />

    <BaseArtistTags
      v-if="tags.length"
      :tags="tags"
      :artistName="artistName"
      :isMore="isMoreTags"
    />

    <template v-if="description">
      <BaseDivider />

      <BaseArtistDescription
        :description="description"
        :artistName="artistName"
        :isMore="isMoreDescription"
      />
    </template>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseArtistTags from '@/models/artist/BaseArtistTags.vue'
import BaseCounters from '@/BaseCounters.vue'
import BaseDivider from '@/BaseDivider.vue'
import BaseArtistDescription from '@/models/artist/BaseArtistDescription.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseHeader,
    BaseArtistTags,
    BaseCounters,
    BaseDivider,
    BaseArtistDescription
  },
  props: {
    artistData: {
      type: Object,
      required: true
    }
  },
  computed: {
    artistName () {
      return this.artistData.name
    },
    listenersCount () {
      return this.artistData.listeners_count
    },
    playsCount () {
      return this.artistData.plays_count
    },
    tags () {
      return this.artistData.tags
    },
    isMoreTags () {
      return this.artistData.with_more?.tags
    },
    description () {
      return this.artistData.description
    },
    isMoreDescription () {
      return this.artistData.with_more?.description
    }
  }
}
</script>

<style lang="sass" scoped></style>
