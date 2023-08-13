<template>
  <BaseDropdownItem
    :icon="icon"
    :header="sourceName"
    :is-loading="isLoading"
    :is-error="isError"
    :is-disabled="isDisabled"
    is-icon-colored
    @click="handleClick"
  />
</template>

<script>
import BaseDropdownItem from '@/components/dropdowns/BaseDropdownItem.vue'

export default {
  name: 'SourceItemContent',
  components: {
    BaseDropdownItem
  },
  inject: [
    'setSelectedSourceData'
  ],
  props: {
    sourceData: {
      type: Object,
      required: true
    },
    tracksData: Object,
    isLoading: Boolean,
    isError: Boolean
  },
  computed: {
    isDisabled () {
      return (
        this.isLoading ||
          this.isError ||
          !this.tracksData
      )
    },
    icon () {
      return this.sourceData.icon
    },
    sourceName () {
      return this.sourceData.name
    }
  },
  methods: {
    handleClick () {
      this.setSelectedSourceData(
        {
          tracksData: this.tracksData
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
