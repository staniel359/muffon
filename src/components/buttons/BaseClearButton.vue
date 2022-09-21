<template>
  <BaseButton
    class="basic mini compact circular main-clear-button"
    icon="close"
    :class="{
      red: isRed
    }"
    :is-invertable="isInvertable"
    @click.prevent.stop="handleClick"
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
    'click'
  ],
  methods: {
    handleClick (
      event
    ) {
      this.$emit(
        'click',
        event
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
