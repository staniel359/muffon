<template>
  <AlbumHeader
    :artistName="artistName"
    :albumTitle="albumTitle"
  />

  <SecondarySection
    :albumData="albumData"
    :requestAlbumData="requestAlbumData"
  />

  <template v-if="description">
    <BaseDivider />

    <BaseAlbumDescription
      :description="description"
      :requestAlbumData="requestAlbumData"
      isMore
    />
  </template>
</template>

<script>
import AlbumHeader from './InfoSection/AlbumHeader.vue'
import SecondarySection from './InfoSection/SecondarySection.vue'
import BaseDivider from '@/BaseDivider.vue'
import BaseAlbumDescription from '@/models/album/BaseAlbumDescription.vue'

export default {
  name: 'InfoSection',
  components: {
    AlbumHeader,
    SecondarySection,
    BaseDivider,
    BaseAlbumDescription
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    requestAlbumData: Object
  },
  computed: {
    artistName () {
      return this.albumData.artist.name
    },
    albumTitle () {
      return this.albumData.title
    },
    description () {
      return this.albumData.description
    }
  }
}
</script>

<style lang="sass" scoped></style>
