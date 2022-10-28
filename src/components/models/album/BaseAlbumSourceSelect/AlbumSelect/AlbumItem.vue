<template>
  <BaseDropdownItem
    model="album"
    :value="uuid"
    :image="imageData?.extrasmall"
    :header="albumTitle"
    :subheader="albumExtraTitle"
    :content="artistName"
    is-with-image
  />
</template>

<script>
import BaseDropdownItem from '@/components/dropdowns/BaseDropdownItem.vue'

export default {
  name: 'AlbumItem',
  components: {
    BaseDropdownItem
  },
  props: {
    albumData: {
      type: Object,
      required: true
    }
  },
  computed: {
    uuid () {
      return this.albumData.uuid
    },
    imageData () {
      return this.albumData.image
    },
    albumTitle () {
      return this.albumData.title
    },
    albumExtraTitle () {
      return this.albumData.extra_title
    },
    artistName () {
      return this.albumData.artist.name
    }
  }
}
</script>

<style lang="sass" scoped></style>
