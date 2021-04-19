<template>
  <BasePaginatedSectionContainer
    class="similar-section"
    headerText="Similar"
    scope="similar"
    :clientPageLimit="5"
    :responsePageLimit="25"
    :artistName="artistName"
    :trackTitle="trackTitle"
    :formatHeaderLink="formatTrackSimilarLink"
  >
    <template #default="sectionSlotProps">
      <BaseTracksSimpleList
        :tracks="sectionSlotProps.similar"
        isWithArtistName
        isWithLength
      />
    </template>
  </BasePaginatedSectionContainer>
</template>

<script>
import BasePaginatedSectionContainer
  from '@/containers/pages/track/BasePaginatedSectionContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import { trackSimilar as formatTrackSimilarLink } from '#/formatters/links'

export default {
  name: 'SimilarSection',
  components: {
    BasePaginatedSectionContainer,
    BaseTracksSimpleList
  },
  props: {
    artistName: String,
    trackTitle: String
  },
  methods: {
    formatTrackSimilarLink
  }
}
</script>

<style lang="sass" scoped>
.similar-section
  @extend .flex-full
</style>
