<template>
  <RouterLink
    class="main-link-container"
    :to="link"
  >
    <slot></slot>
  </RouterLink>
</template>

<script>
export default {
  name: 'BaseLinkContainer',
  props: {
    link: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
