<template>
  <BaseDropdownItem
    model="album"
    :image="imageData?.extrasmall"
    :header="albumTitle"
    :subheader="albumExtraTitle"
    :content="artistName"
    isWithImage
    @click="handleClick"
  />
</template>

<script>
import BaseDropdownItem from '@/dropdowns/BaseDropdownItem.vue'
import { generateKey } from '#/utils'
import { artistName as formatArtistName } from '#/formatters/artist'

export default {
  name: 'AlbumItem',
  components: {
    BaseDropdownItem
  },
  inject: [
    'setSelectedAlbumData'
  ],
  props: {
    albumData: {
      type: Object,
      required: true
    }
  },
  computed: {
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
      return formatArtistName(
        this.artists
      )
    },
    artists () {
      return this.albumData.artists
    }
  },
  methods: {
    handleClick () {
      this.setSelectedAlbumData({
        ...this.albumData,
        uuid: generateKey()
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
