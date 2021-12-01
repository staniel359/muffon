<template>
  <TypeItem
    v-for="(typeData, index) in typesFormatted"
    :key="typeData.uuid"
    :typeId="typeData.name"
    :index="index"
  />
</template>

<script>
import TypeItem from './TypesList/TypeItem.vue'
import { collection as formatCollection } from '#/formatters'

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
    }
  },
  computed: {
    typesFormatted () {
      return formatCollection(
        this.types
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
