<template>
  <BaseSegmentContainer
    class="playing-info-block"
    :is-change-transparency="false"
    is-inverted
  >
    <TitleSection
      :track-data="trackData"
    />

    <ArtistsSection
      :track-data="trackData"
    />

    <AlbumSection
      :track-data="trackData"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import TitleSection from './InfoBlock/TitleSection.vue'
import ArtistsSection from './InfoBlock/ArtistsSection.vue'
import AlbumSection from './InfoBlock/AlbumSection.vue'

export default {
  name: 'InfoBlock',
  components: {
    BaseSegmentContainer,
    TitleSection,
    ArtistsSection,
    AlbumSection
  },
  props: {
    trackData: Object
  }
}
</script>

<style lang="sass" scoped>
.playing-info-block
  @extend .absolute, .w-100, .background-black-transparent, .no-margin
  z-index: 1
  padding: 1.25em 2.25em
  bottom: 0
</style>
