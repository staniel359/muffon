<template>
  <BaseDropdownItem
    :image="image"
    :header="artistName"
    isImageCircular
    @click="handleClick"
  />
</template>

<script>
import BaseDropdownItem from '@/dropdowns/BaseDropdownItem.vue'
import { generateKey } from '#/utils'

export default {
  name: 'ArtistItem',
  components: {
    BaseDropdownItem
  },
  inject: [
    'setSelectedArtistData'
  ],
  props: {
    artistData: {
      type: Object,
      required: true
    }
  },
  computed: {
    image () {
      return this.artistData.image?.extrasmall
    },
    artistName () {
      return this.artistData.name
    }
  },
  methods: {
    handleClick () {
      this.setSelectedArtistData({
        ...this.artistData,
        uuid: generateKey()
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
