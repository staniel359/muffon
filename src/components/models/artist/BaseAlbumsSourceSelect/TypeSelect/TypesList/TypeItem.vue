<template>
  <BaseDropdownItem
    :data-value="index"
    :header="headerFormatted"
    :isDisabled="isDisabled"
    @click="handleClick"
  />
</template>

<script>
import BaseDropdownItem from '@/dropdowns/BaseDropdownItem.vue'

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
    index: {
      type: Number,
      required: true
    },
    isDisabled: Boolean
  },
  computed: {
    headerFormatted () {
      return this.$t(
        `shared.sources.albumsTypes.${this.typeId}`
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
