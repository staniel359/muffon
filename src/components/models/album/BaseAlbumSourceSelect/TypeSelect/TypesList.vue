<template>
  <TypeItem
    v-for="(type, index) in types"
    :key="index"
    :type="type"
    :albums-data="albumsData"
  />
</template>

<script>
import TypeItem from './TypesList/TypeItem.vue'

export default {
  name: 'TypesList',
  components: {
    TypeItem
  },
  props: {
    types: {
      type: Array,
      default () {
        return []
      }
    },
    albumsData: Object
  }
}
</script>

<style lang="sass" scoped></style>
