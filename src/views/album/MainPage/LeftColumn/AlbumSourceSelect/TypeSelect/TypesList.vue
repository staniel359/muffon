<template>
  <div class="menu">
    <TypeItem
      v-for="typeData in typesFormatted"
      :key="typeData.uuid"
      :typeId="typeData.name"
      :isDisabled="isNoCollection(typeData.name)"
    />
  </div>
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
    typesFormatted () {
      return formatCollection(this.types)
    }
  },
  methods: {
    isNoCollection (type) {
      const scope = `${type}s`

      return !this.albumsData[scope]
    }
  }
}
</script>

<style lang="sass" scoped></style>
