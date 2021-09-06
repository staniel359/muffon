<template>
  <BaseDropdownItem
    :header="headerFormatted"
    :isDisabled="isDisabled"
    @click="handleClick"
  />
</template>

<script>
import BaseDropdownItem from '@/BaseDropdownItem.vue'

export default {
  name: 'TypeItem',
  components: {
    BaseDropdownItem
  },
  inject: [
    'setSelectedTypeId'
  ],
  props: {
    typeId: {
      type: String,
      required: true
    },
    isDisabled: Boolean
  },
  computed: {
    headerFormatted () {
      return this.$t(
        `shared.sources.albumTypes.${this.typeId}`
      )
    }
  },
  methods: {
    handleClick () {
      this.setSelectedTypeId(
        this.typeId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
