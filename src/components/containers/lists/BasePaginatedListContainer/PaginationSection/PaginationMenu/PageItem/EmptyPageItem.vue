<template>
  <div
    class="item"
    :class="{
      disabled: isDisabled
    }"
  >
    <i
      :class="[
        'ellipsis horizontal small icon',
        'direction-icon'
      ]"
    />
  </div>
</template>

<script>
export default {
  name: 'EmptyPageItem',
  props: {
    isDisabled: Boolean
  }
}
</script>

<style lang="sass" scoped></style>
