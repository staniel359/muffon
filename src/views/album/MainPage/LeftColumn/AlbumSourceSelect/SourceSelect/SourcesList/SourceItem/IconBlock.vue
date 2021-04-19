<template>
  <i
    class="icon colored"
    :class="iconFormatted"
  >
    <div
      v-if="isLoading"
      class="ui mini active inline loader"
    ></div>
  </i>
</template>

<script>
export default {
  name: 'IconBlock',
  props: {
    isLoading: Boolean,
    isError: Boolean,
    icon: String
  },
  computed: {
    iconFormatted () {
      if (this.isLoading) {
        return null
      } else if (this.isError) {
        return 'close'
      } else {
        return this.icon
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
