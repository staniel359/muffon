<template>
  <BaseButton
    class="basic mini compact circular main-right-small-section"
    icon="clear"
    :class="{
      red: isRed
    }"
    :is-invertable="isInvertable"
    @click.prevent.stop="handleClick"
    @active-change="handleActiveChange"
  />
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'BaseClearButton',
  components: {
    BaseButton
  },
  props: {
    isRed: {
      type: Boolean,
      default: true
    },
    isInvertable: Boolean
  },
  emits: [
    'click',
    'activeChange'
  ],
  methods: {
    handleClick (
      event
    ) {
      this.$emit(
        'click',
        event
      )
    },
    handleActiveChange (
      value
    ) {
      this.$emit(
        'activeChange',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
