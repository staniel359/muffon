<template>
  <BaseLabel
    class="primary circular large"
    :text="name"
    :is-invertable="false"
    is-clearable
    @clear-icon-click="handleClearIconClick"
  />
</template>

<script>
import BaseLabel from '@/components/labels/BaseLabel.vue'

export default {
  name: 'BaseFilterItemLabel',
  components: {
    BaseLabel
  },
  props: {
    filterItemData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'clearIconClick'
  ],
  computed: {
    name () {
      return this.filterItemData.name
    },
    uuid () {
      return this.filterItemData.uuid
    }
  },
  methods: {
    handleClearIconClick () {
      this.$emit(
        'clearIconClick',
        {
          uuid: this.uuid
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
