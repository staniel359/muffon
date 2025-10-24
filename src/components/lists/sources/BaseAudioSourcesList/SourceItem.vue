<template>
  <BaseDropdownItem
    :value="source"
    :icon="icon"
    :header="sourceName"
    :extra="bitrateText"
    is-icon-colored
  />
</template>

<script>
import BaseDropdownItem from '@/components/dropdowns/BaseDropdownItem.vue'
import {
  maxBitrate as formatMaxBitrate
} from '@/helpers/formatters'

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
      return formatMaxBitrate(
        this.maxBitrate
      )
    },
    maxBitrate () {
      return this.sourceData.maxBitrate
    }
  }
}
</script>

<style lang="sass" scoped></style>
