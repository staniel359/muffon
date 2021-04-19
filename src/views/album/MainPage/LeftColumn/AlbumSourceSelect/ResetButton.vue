<template>
  <button
    class="ui icon basic compact right floated button"
    :class="{ red: isHovered }"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <i class="close icon"></i>
    Reset
  </button>
</template>

<script>
export default {
  name: 'ResetButton',
  inject: [
    'resetAlbum'
  ],
  data () {
    return {
      isHovered: false
    }
  },
  methods: {
    handleClick () {
      this.resetAlbum()
    },
    handleMouseEnter () {
      this.isHovered = true
    },
    handleMouseLeave () {
      this.isHovered = false
    }
  }
}
</script>

<style lang="sass" scoped></style>
