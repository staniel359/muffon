<template>
  <BaseDropdownItem
    :value="typeId"
    :header="headerText"
    :is-disabled="isDisabled"
  />
</template>

<script>
import BaseDropdownItem from '@/components/dropdowns/BaseDropdownItem.vue'

export default {
  name: 'TypeItem',
  components: {
    BaseDropdownItem
  },
  props: {
    typeId: {
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
        `sources.albumTypes.${this.typeId}`
      )
    },
    isDisabled () {
      return !this.albumsData[
        this.scope
      ]
    },
    scope () {
      return `${this.typeId}s`
    }
  }
}
</script>

<style lang="sass" scoped></style>
