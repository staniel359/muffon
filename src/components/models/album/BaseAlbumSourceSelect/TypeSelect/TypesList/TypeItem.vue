<template>
  <BaseDropdownItem
    :header="headerText"
    :is-disabled="isDisabled"
    @click="handleClick"
  />
</template>

<script>
import BaseDropdownItem from '@/components/dropdowns/BaseDropdownItem.vue'

export default {
  name: 'TypeItem',
  components: {
    BaseDropdownItem
  },
  inject: [
    'setSelectedTypeId'
  ],
  props: {
    type: {
      type: String,
      required: true
    },
    albumsData: {
      type: Object,
      required: true
    }
  },
  computed: {
    headerText () {
      return this.$t(
        `sources.albumTypes.${this.type}`
      )
    },
    isDisabled () {
      return !this.albumsData[
        this.scope
      ]
    },
    scope () {
      return `${this.type}s`
    }
  },
  methods: {
    handleClick () {
      this.setSelectedTypeId(
        this.type
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
