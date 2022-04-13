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
        'angle right icon',
        'direction-icon'
      ]"
    />
  </a>
</template>

<script>
export default {
  name: 'NextPageItem',
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
