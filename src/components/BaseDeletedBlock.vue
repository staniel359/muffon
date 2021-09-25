<template>
  <div class="main-deleted-container">
    <span>
      {{ textFormatted }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'BaseDeletedBlock',
  props: {
    isBookmark: Boolean,
    isFavorite: Boolean
  },
  computed: {
    textFormatted () {
      return this.$t(
        `shared.${this.model}.deleted`
      )
    },
    model () {
      return (
        this.isBookmark && 'bookmark'
      ) || (
        this.isFavorite && 'favorite'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
