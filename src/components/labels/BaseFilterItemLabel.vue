<template>
  <BaseLabel
    class="primary circular large"
    icon="clear"
    :text="name"
    :is-invertable="false"
    is-reverse
    @icon-click="handleDeleteIconClick"
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
    'deleteIconClick'
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
    handleDeleteIconClick () {
      this.$emit(
        'deleteIconClick',
        {
          uuid: this.uuid
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
