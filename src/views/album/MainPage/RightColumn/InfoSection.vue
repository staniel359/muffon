<template>
  <div class="header-source-section">
    <HeaderBlock
      class="album-header-block"
      :album-data="albumData"
    />

    <BaseSourceIcon
      v-if="isRenderSource"
      :source="source"
    />
  </div>

  <SecondarySection
    :album-data="albumData"
    :request-album-data="requestAlbumData"
  />
</template>

<script>
import HeaderBlock from './InfoSection/HeaderBlock.vue'
import BaseSourceIcon from '@/components/icons/BaseSourceIcon.vue'
import SecondarySection from './InfoSection/SecondarySection.vue'

export default {
  name: 'InfoSection',
  components: {
    HeaderBlock,
    BaseSourceIcon,
    SecondarySection
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    requestAlbumData: Object
  },
  computed: {
    isRenderSource () {
      return this.source !== 'lastfm'
    },
    source () {
      return this.albumData.source.name
    }
  }
}
</script>

<style lang="sass" scoped>
.header-source-section
  @extend .d-flex
</style>
