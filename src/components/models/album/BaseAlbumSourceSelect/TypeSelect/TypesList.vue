<template>
  <TypeItem
    v-for="typeData in typesCollection"
    :key="typeData.uuid"
    :typeId="typeData.name"
    :isDisabled="isNoCollection(typeData.name)"
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
    albumsData: {
      type: Object,
      required: true
    },
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
  },
  methods: {
    isNoCollection (type) {
      const formatScope = () => {
        if (type === 'albumVarious') {
          return 'albums_various'
        } else {
          return `${type}s`
        }
      }

      return !this.albumsData[
        formatScope()
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
