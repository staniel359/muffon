<template>
  <TypeItem
    v-for="(typeData, index) in typesCollection"
    :key="typeData.uuid"
    :typeId="typeData.name"
    :index="index"
  />
</template>

<script>
import TypeItem from './TypesList/TypeItem.vue'
import { collection as formatCollection } from '*/helpers/formatters'

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
    typesCollection () {
      return formatCollection(
        this.types
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
