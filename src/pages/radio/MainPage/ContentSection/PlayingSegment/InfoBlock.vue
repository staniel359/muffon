<template>
  <BaseSegmentContainer
    class="playing-info-block absolute width-100 background-black-transparent no-margin no-bottom no-border-top-radius"
    :is-change-transparency="false"
    is-inverted
  >
    <BaseItemContainer
      is-inverted
    >
      <div class="content">
        <TitleSection
          :track-data="trackData"
        />

        <ArtistsSection
          :track-data="trackData"
        />

        <AlbumSection
          v-if="albumData"
          :track-data="trackData"
        />
      </div>
    </BaseItemContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseItemContainer
  from '@/components/containers/item/BaseItemContainer.vue'
import TitleSection from './InfoBlock/TitleSection.vue'
import ArtistsSection from './InfoBlock/ArtistsSection.vue'
import AlbumSection from './InfoBlock/AlbumSection.vue'

export default {
  name: 'InfoBlock',
  components: {
    BaseSegmentContainer,
    BaseItemContainer,
    TitleSection,
    ArtistsSection,
    AlbumSection
  },
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  computed: {
    albumData () {
      return this.trackData.album
    }
  }
}
</script>

<style lang="sass" scoped>
.playing-info-block
  padding: 1.75rem 2.5rem 2rem !important
</style>
