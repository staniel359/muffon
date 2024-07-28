<template>
  <div class="d-flex main-top-big-section">
    <HeaderBlock
      :album-data="albumData"
    />

    <BaseSourceIcon
      v-if="isRenderSource"
      class="right"
      :source="source"
    />
  </div>

  <div
    v-if="isAnyTracks"
    class="main-top-section"
  >
    <BaseAlbumTracksPlayButton
      :request-album-data="requestAlbumData"
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
import BaseAlbumTracksPlayButton
  from '@/components/buttons/play/album/BaseAlbumTracksPlayButton.vue'

export default {
  name: 'InfoSection',
  components: {
    HeaderBlock,
    BaseSourceIcon,
    SecondarySection,
    BaseAlbumTracksPlayButton
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
    },
    isAnyTracks () {
      return !!this.albumData.tracks?.length
    }
  }
}
</script>

<style lang="sass" scoped></style>
