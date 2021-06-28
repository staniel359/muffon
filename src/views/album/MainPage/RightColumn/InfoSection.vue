<template>
  <AlbumHeader
    :albumTitle="albumTitle"
    :albumExtraTitle="albumExtraTitle"
    :artists="artists"
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
    albumTitle () {
      return this.albumData.title
    },
    albumExtraTitle () {
      return this.albumData.extra_title
    },
    artists () {
      return this.albumData.artists
    }
  }
}
</script>

<style lang="sass" scoped></style>
