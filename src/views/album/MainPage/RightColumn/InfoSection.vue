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
    <div class="ui divider main-divider"></div>

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
import BaseAlbumDescription from '@/models/album/BaseAlbumDescription.vue'

export default {
  name: 'InfoSection',
  components: {
    AlbumHeader,
    SecondarySection,
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
