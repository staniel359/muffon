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
    isDisabled: Boolean
  },
  computed: {
    headerText () {
      return this.$t(
        `sources.albumsTypes.${this.typeId}`
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
