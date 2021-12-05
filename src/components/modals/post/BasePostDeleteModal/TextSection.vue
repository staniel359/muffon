<template>
  <div class="content">
    <p
      v-html="goingFormatted"
    ></p>

    <p>
      <strong>
        {{ undoFormatted }}
      </strong>
    </p>

    <p>
      {{ sureFormatted }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'TextSection',
  computed: {
    goingFormatted () {
      return this.$t(
        'shared.post.delete.going'
      )
    },
    undoFormatted () {
      return this.$t(
        'modals.undo'
      )
    },
    sureFormatted () {
      return this.$t(
        'modals.sure'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
