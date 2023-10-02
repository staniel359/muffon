<template>
  <BaseSegmentContainer
    class="raised main-segment-container"
  >
    <BaseHeader
      class="main-artist-name"
      tag="h1"
      :text="artistName"
    />

    <div>
      <BaseCounterLabelsSection
        class="main-labels-section"
        :counters="counters"
      />

      <BaseArtistInnerCounterLabelsSection
        class="main-labels-section"
        :artist-data="artistData"
      />

      <BaseArtistTags
        class="main-labels-section"
        :artist-data="artistData"
      />
    </div>

    <template
      v-if="description"
    >
      <BaseDivider />

      <BaseArtistDescription
        :artist-data="artistData"
      />
    </template>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseArtistTags from '@/components/models/artist/BaseArtistTags.vue'
import BaseCounterLabelsSection
  from '@/components/sections/BaseCounterLabelsSection.vue'
import BaseArtistInnerCounterLabelsSection
  from '@/components/sections/artist/BaseArtistInnerCounterLabelsSection.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseArtistDescription
  from '@/components/models/artist/BaseArtistDescription.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseHeader,
    BaseArtistTags,
    BaseCounterLabelsSection,
    BaseArtistInnerCounterLabelsSection,
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
