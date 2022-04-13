<template>
  <BaseDropdownItem
    model="album"
    :image="imageData?.extrasmall"
    :header="albumTitle"
    :subheader="albumExtraTitle"
    :content="artistName"
    is-with-image
    @click="handleClick"
  />
</template>

<script>
import BaseDropdownItem from '*/components/dropdowns/BaseDropdownItem.vue'
import {
  generateKey
} from '*/helpers/utils'
import {
  artistName as formatArtistName
} from '*/helpers/formatters'

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
      this.setSelectedAlbumData(
        {
          ...this.albumData,
          uuid: generateKey()
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
