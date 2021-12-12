<template>
  <div class="content">
    <p
      v-html="goingText"
    ></p>

    <p>
      <strong>
        {{ undoText }}
      </strong>
    </p>

    <p>
      {{ sureText }}
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
    goingText () {
      return this.$t(
        'shared.playlistTrack.delete.going',
        {
          playlistTrackFullTitle: this.playlistTrackFullTitleStrong,
          playlistTitle: this.playlistTitleStrong
        }
      )
    },
    playlistTrackFullTitleStrong () {
      return `<strong>${this.playlistTrackFullTitle}</strong>`
    },
    playlistTitleStrong () {
      return `<strong>${this.playlistTitle}</strong>`
    },
    undoText () {
      return this.$t(
        'modals.undo'
      )
    },
    sureText () {
      return this.$t(
        'modals.sure'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
