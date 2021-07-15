<template>
  <BaseDropdownItem
    :icon="icon"
    :header="sourceName"
    :extra="extraFormatted"
    :isLoading="isLoading"
    :isError="isError"
    :isDisabled="isDisabled"
    isIconColored
    @click="handleClick"
  />
</template>

<script>
import BaseDropdownItem from '@/BaseDropdownItem.vue'

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
    extraFormatted () {
      if (this.isWithMaxBitrate) {
        return this.maxBitrateFormatted
      } else {
        return null
      }
    },
    maxBitrateFormatted () {
      return `~ ${this.sourceData.maxBitrate}`
    },
    sourceId () {
      return this.sourceData.id
    }
  },
  methods: {
    handleClick () {
      this.setSelectedSourceData({
        id: this.sourceId,
        tracks: this.tracks
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
