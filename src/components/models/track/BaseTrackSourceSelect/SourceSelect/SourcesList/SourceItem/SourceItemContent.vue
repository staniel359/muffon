<template>
  <BaseDropdownItem
    :icon="icon"
    :header="sourceName"
    :extra="extraText"
    :is-loading="isLoading"
    :is-error="isError"
    :is-disabled="isDisabled"
    is-colored
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
    tracks: Array,
    isLoading: Boolean,
    isError: Boolean,
    isWithMaxBitrate: Boolean
  },
  computed: {
    isDisabled () {
      return (
        this.isLoading ||
          this.isError ||
          !this.isAnyTracks
      )
    },
    isAnyTracks () {
      return this.tracks?.length
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
    }
  },
  methods: {
    handleClick () {
      this.setSelectedSourceData(
        {
          tracks: this.tracks
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
