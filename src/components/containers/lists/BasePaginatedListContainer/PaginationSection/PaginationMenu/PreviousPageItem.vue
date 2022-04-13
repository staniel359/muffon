<template>
  <a
    class="item"
    :class="{
      disabled: isDisabled
    }"
    @click="handleClick"
  >
    <i
      :class="[
        'chevron left icon',
        'direction-icon'
      ]"
    />
  </a>
</template>

<script>
export default {
  name: 'PreviousPageItem',
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
