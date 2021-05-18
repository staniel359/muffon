<template>
  <AlbumHeader
    :artistName="artistName"
    :albumTitle="albumTitle"
  />

  <SecondarySection
    :albumData="albumData"
    :requestAlbumData="requestAlbumData"
  />
</template>

<script>
import AlbumHeader from './InfoSection/AlbumHeader.vue'
import SecondarySection from './InfoSection/SecondarySection.vue'

export default {
  name: 'InfoSection',
  components: {
    AlbumHeader,
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
    artistName () {
      return this.albumData.artist.name
    },
    albumTitle () {
      return this.albumData.title
    }
  }
}
</script>

<style lang="sass" scoped></style>
