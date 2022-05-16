<template>
  <BaseDropdownItem
    :icon="icon"
    :header="sourceName"
    :extra="extraText"
    :is-loading="isLoading"
    :is-error="isError"
    :is-disabled="isDisabled"
    is-icon-colored
    @click="handleClick"
  />
</template>

<script>
import BaseDropdownItem from '*/components/dropdowns/BaseDropdownItem.vue'

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
    albumsData: Object,
    isLoading: Boolean,
    isError: Boolean,
    isWithMaxBitrate: Boolean
  },
  computed: {
    isDisabled () {
      return (
        this.isLoading ||
          this.isError ||
          !this.albumsData
      )
    },
    icon () {
      return this.sourceData.icon
    },
    sourceName () {
      return this.sourceData.name
    },
    extraText () {
      if (this.isWithMaxBitrate) {
        return `~ ${this.maxBitrate}`
      } else {
        return null
      }
    },
    maxBitrate () {
      return this.sourceData.maxBitrate
    },
    types () {
      return this.sourceData.albumTypes
    }
  },
  methods: {
    handleClick () {
      this.setSelectedSourceData(
        {
          types: this.types,
          albumsData: this.albumsData
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
