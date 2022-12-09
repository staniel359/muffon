<template>
  <BaseDropdownItem
    :value="source"
    :icon="icon"
    :header="sourceName"
    :extra="bitrateText"
    is-colored
  />
</template>

<script>
import BaseDropdownItem from '@/components/dropdowns/BaseDropdownItem.vue'

export default {
  name: 'SourceItem',
  components: {
    BaseDropdownItem
  },
  props: {
    sourceData: {
      type: Object,
      required: true
    }
  },
  computed: {
    source () {
      return this.sourceData.id
    },
    icon () {
      return this.sourceData.icon
    },
    sourceName () {
      return this.sourceData.name
    },
    bitrateText () {
      return `≤ ${this.maxBitrate}`
    },
    maxBitrate () {
      return this.sourceData.maxBitrate
    }
  }
}
</script>

<style lang="sass" scoped></style>
