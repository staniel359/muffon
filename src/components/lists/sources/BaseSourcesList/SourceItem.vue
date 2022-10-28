<template>
  <BaseDropdownItem
    :value="source"
    :icon="icon"
    :header="sourceName"
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
