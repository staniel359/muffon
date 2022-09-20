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
    artists: Array,
    isLoading: Boolean,
    isError: Boolean
  },
  computed: {
    isDisabled () {
      return (
        this.isLoading ||
          this.isError ||
          !this.isAnyArtists
      )
    },
    isAnyArtists () {
      return !!this.artists?.length
    },
    icon () {
      return this.sourceData.icon
    },
    sourceName () {
      return this.sourceData.name
    },
    types () {
      return this.sourceData.albumsTypes
    }
  },
  methods: {
    handleClick () {
      this.setSelectedSourceData(
        {
          types: this.types,
          artists: this.artists
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
