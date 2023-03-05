<template>
  <BaseDropdownItem
    :value="typeId"
    :header="headerText"
    :is-disabled="isDisabled"
  />
</template>

<script>
import BaseDropdownItem from '@/components/dropdowns/BaseDropdownItem.vue'

export default {
  name: 'TypeItem',
  components: {
    BaseDropdownItem
  },
  props: {
    typeId: {
      type: String,
      required: true
    },
    videosData: {
      type: Object,
      required: true
    }
  },
  computed: {
    headerText () {
      return this.$t(
        `sources.videoTypes.${this.typeId}`
      )
    },
    isDisabled () {
      return !this.videosData[
        this.scope
      ]
    },
    scope () {
      return `${this.typeId}s`
    }
  }
}
</script>

<style lang="sass" scoped></style>
