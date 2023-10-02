<template>
  <BaseItemContainer>
    <div class="content">
      <div
        class="header"
        v-text="trackTitle"
      />

      <ArtistsSection
        :track-data="trackData"
      />

      <AlbumSection
        v-if="albumData"
        :track-data="trackData"
      />
    </div>

    <BaseSourceIcon
      v-if="isRenderSource"
      class="right"
      :source="source"
    />
  </BaseItemContainer>
</template>

<script>
import BaseItemContainer
  from '@/components/containers/item/BaseItemContainer.vue'
import ArtistsSection from './InfoSection/ArtistsSection.vue'
import AlbumSection from './InfoSection/AlbumSection.vue'
import BaseSourceIcon from '@/components/icons/BaseSourceIcon.vue'

export default {
  name: 'InfoSection',
  components: {
    BaseItemContainer,
    ArtistsSection,
    AlbumSection,
    BaseSourceIcon
  },
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  computed: {
    trackTitle () {
      return this.trackData.title
    },
    albumData () {
      return this.trackData.album
    },
    isRenderSource () {
      return !this.isLastfmSource
    },
    isLastfmSource () {
      return (
        this.source === 'lastfm'
      )
    },
    source () {
      return this.sourceData.name
    },
    sourceData () {
      return this.trackData.source
    }
  }
}
</script>

<style lang="sass" scoped></style>
