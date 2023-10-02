<template>
  <a
    class="item"
    :class="{
      disabled: isDisabled
    }"
    @click="handleClick"
  >
    <BaseIcon
      class="main-icon"
      icon="directionLeft"
      is-with-rtl
    />
  </a>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'

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
