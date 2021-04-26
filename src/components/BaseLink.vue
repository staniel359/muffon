<template>
  <RouterLink
    class="ui main-link"
    :to="link"
  >
    {{ text }}
  </RouterLink>
</template>

<script>
export default {
  name: 'BaseLink',
  props: {
    link: {
      type: Object,
      default () {
        return {}
      }
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped></style>
