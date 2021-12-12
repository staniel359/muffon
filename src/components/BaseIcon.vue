<template>
  <i
    class="icon"
    :class="iconConditional"
  >
    <div
      v-if="isLoading"
      class="ui mini active inline loader"
    ></div>
  </i>
</template>

<script>
export default {
  name: 'BaseIcon',
  props: {
    isLoading: Boolean,
    isError: Boolean,
    icon: String
  },
  computed: {
    iconConditional () {
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
