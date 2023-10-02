<template>
  <div class="d-flex">
    <HeaderBlock
      :album-data="albumData"
    />

    <BaseSourceIcon
      v-if="isRenderSource"
      class="right"
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
      return this.albumData.source
    }
  }
}
</script>

<style lang="sass" scoped></style>
