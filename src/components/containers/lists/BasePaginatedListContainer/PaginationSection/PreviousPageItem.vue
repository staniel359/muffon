<template>
  <a
    class="item"
    :class="{
      disabled: isDisabled
    }"
    @click="handleClick"
  >
    <BaseIcon
      class="direction-icon"
      icon="chevron left"
    />
  </a>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue'

export default {
  name: 'PreviousPageItem',
  components: {
    BaseIcon
  },
  props: {
    isDisabled: Boolean
  },
  emits: [
    'click'
  ],
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
