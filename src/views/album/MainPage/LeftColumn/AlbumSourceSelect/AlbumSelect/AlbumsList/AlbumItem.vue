<template>
  <BaseDropdownItem
    :image="image"
    :header="albumTitle"
    :content="artistName"
    @click="handleClick"
  />
</template>

<script>
import BaseDropdownItem from '@/BaseDropdownItem.vue'
import { generateKey } from '#/utils'

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
    image () {
      return this.albumData.image.extrasmall
    },
    albumTitle () {
      return this.albumData.title
    },
    artistName () {
      return this.albumData.artist?.name
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
