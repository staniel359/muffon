<template>
  <BaseButton
    class="basic circular"
    left-icon="filter"
    :class="{
      active: isActive
    }"
    :text="filterText"
    @click="handleClick"
  />
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'BaseFilterButton',
  components: {
    BaseButton
  },
  props: {
    isActive: Boolean
  },
  emits: [
    'click'
  ],
  computed: {
    filterText () {
      return this.$t(
        'actions.filter'
      )
    }
  },
  methods: {
    handleClick () {
      this.$emit(
        'click'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
