<template>
  <div class="content">
    <p
      v-html="goingFormatted"
    ></p>

    <p>
      {{ alsoFormatted }}
    </p>

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
  props: {
    playlistTitle: {
      type: String,
      required: true
    }
  },
  computed: {
    goingFormatted () {
      return this.$t(
        'shared.playlist.delete.going',
        { playlistTitle: this.playlistTitleFormatted }
      )
    },
    playlistTitleFormatted () {
      return `<strong>${this.playlistTitle}</strong>`
    },
    alsoFormatted () {
      return this.$t(
        'shared.playlist.delete.also'
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
