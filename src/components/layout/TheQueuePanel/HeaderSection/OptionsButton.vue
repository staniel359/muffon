<template>
  <button
    class="ui compact basic icon button options-button"
    @click="handleClick"
  >
    <i class="cog icon"></i>
  </button>
</template>

<script>
export default {
  name: 'OptionsButton',
  emits: [
    'click'
  ],
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="sass" scoped>
.options-button
  @extend .no-margin, .no-padding, .no-shadow
</style>
