<template>
  <BaseDropdownItem
    model="artist"
    :value="uuid"
    :image="imageData?.extrasmall"
    :header="artistName"
    is-with-image
    is-image-circular
  />
</template>

<script>
import BaseDropdownItem from '@/components/dropdowns/BaseDropdownItem.vue'

export default {
  name: 'ArtistItem',
  components: {
    BaseDropdownItem
  },
  props: {
    artistData: {
      type: Object,
      required: true
    }
  },
  computed: {
    uuid () {
      return this.artistData.uuid
    },
    imageData () {
      return this.artistData.image
    },
    artistName () {
      return this.artistData.name
    }
  }
}
</script>

<style lang="sass" scoped></style>
