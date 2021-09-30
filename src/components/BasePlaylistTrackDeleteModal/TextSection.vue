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
  props: {
    playlistTrackFullTitle: {
      type: String,
      required: true
    },
    playlistTitle: {
      type: String,
      required: true
    }
  },
  computed: {
    goingFormatted () {
      return this.$t(
        'shared.playlistTrack.delete.going',
        {
          playlistTrackFullTitle: this.playlistTrackFullTitleFormatted,
          playlistTitle: this.playlistTitleFormatted
        }
      )
    },
    playlistTrackFullTitleFormatted () {
      return `<strong>${this.playlistTrackFullTitle}</strong>`
    },
    playlistTitleFormatted () {
      return `<strong>${this.playlistTitle}</strong>`
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
