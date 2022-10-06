<template>
  <i
    class="icon"
    :class="iconConditional"
    @click="handleClick"
  >
    <div
      v-if="isLoading"
      class="ui mini active inline loader"
    />
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
  emits: [
    'click'
  ],
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
  },
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
