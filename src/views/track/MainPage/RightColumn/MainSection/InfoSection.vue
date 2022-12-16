<template>
  <div
    class="info-section"
    :class="{
      inverted: isDarkMode
    }"
  >
    <div class="track-info-block">
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

    <BaseSourceIcon
      v-if="isRenderSource"
      class="source-icon-block"
      :source="source"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import TitleSection from './InfoSection/TitleSection.vue'
import ArtistsSection from './InfoSection/ArtistsSection.vue'
import AlbumSection from './InfoSection/AlbumSection.vue'
import BaseSourceIcon from '@/components/icons/BaseSourceIcon.vue'

export default {
  name: 'InfoSection',
  components: {
    TitleSection,
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
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    albumData () {
      return this.trackData.album
    },
    isRenderSource () {
      return this.source !== 'lastfm'
    },
    source () {
      return this.trackData.source.name
    }
  }
}
</script>

<style lang="sass" scoped>
.info-section
  @extend .d-flex
  border-bottom: $border
  padding: 1em
  &.inverted
    border-bottom: $borderInverted

.track-info-block
  @extend .flex-full

.source-icon-block
  margin-left: 0.5em
</style>
