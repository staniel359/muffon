<template>
  <TypeItem
    v-for="typeData in typesCollection"
    :key="typeData.uuid"
    :type-id="typeData.name"
    :is-disabled="isNoCollection(typeData.name)"
  />
</template>

<script>
import TypeItem from './TypesList/TypeItem.vue'
import {
  collection as formatCollection
} from '*/helpers/formatters'

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
    isNoCollection (
      type
    ) {
      const scope =
        this.formatScope(
          type
        )

      return !this.albumsData[
        scope
      ]
    },
    formatScope (
      type
    ) {
      if (type === 'albumVarious') {
        return 'albums_various'
      } else {
        return `${type}s`
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
