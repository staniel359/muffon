<template>
  <BaseDropdownItem
    :data-value="index"
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
    'setSelectedTypeData'
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
    headerText () {
      return this.$t(
        `sources.albumsTypes.${this.typeId}`
      )
    }
  },
  methods: {
    handleClick () {
      this.setSelectedTypeData(
        {
          id: this.typeId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
