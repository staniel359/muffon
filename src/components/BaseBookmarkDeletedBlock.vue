<template>
  <div class="main-deleted-container">
    <span>
      {{ textFormatted }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'BaseBookmarkDeletedBlock',
  computed: {
    textFormatted () {
      return this.$t(
        'shared.bookmark.deleted'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
