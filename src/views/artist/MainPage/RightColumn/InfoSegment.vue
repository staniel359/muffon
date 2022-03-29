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
      :artistData="artistData"
    />

    <template v-if="description">
      <BaseDivider />

      <BaseArtistDescription
        :artistData="artistData"
      />
    </template>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseArtistTags from '*/components/models/artist/BaseArtistTags.vue'
import BaseCounters from '*/components/BaseCounters.vue'
import BaseDivider from '*/components/BaseDivider.vue'
import BaseArtistDescription
  from '*/components/models/artist/BaseArtistDescription.vue'

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
    description () {
      return this.artistData.description
    }
  }
}
</script>

<style lang="sass" scoped></style>
