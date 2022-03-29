<template>
  <BaseLabel
    icon="close"
    :text="filterItemData.name"
    isReverse
    @iconClick="handleDeleteButtonClick"
  />
</template>

<script>
import BaseLabel from '*/components/BaseLabel.vue'

export default {
  name: 'FilterItem',
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
    'deleteButtonClick'
  ],
  methods: {
    handleDeleteButtonClick () {
      this.$emit(
        'deleteButtonClick',
        this.filterItemData.uuid
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
