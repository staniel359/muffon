<template>
  <div
    v-if="isLoading"
    class="ui image placeholder"
    :class="{
      rounded: isRounded,
      circular: isCircular,
      bordered: isBordered
    }"
  ></div>
  <img
    v-else-if="image"
    class="ui image"
    :class="{
      rounded: isRounded,
      circular: isCircular,
      bordered: isBordered
    }"
    :src="image"
  />
</template>

<script>
export default {
  name: 'BaseImage',
  props: {
    image: String,
    isLoading: Boolean,
    isRounded: Boolean,
    isCircular: Boolean,
    isBordered: Boolean
  }
}
</script>

<style lang="sass" scoped></style>
