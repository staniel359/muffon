<template>
  <div class="content">
    <p
      v-html="goingText"
    ></p>

    <p>
      {{ alsoText }}
    </p>

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
    playlistTitle: {
      type: String,
      required: true
    }
  },
  computed: {
    goingText () {
      return this.$t(
        'shared.playlist.delete.going',
        { playlistTitle: this.playlistTitleStrong }
      )
    },
    playlistTitleStrong () {
      return `<strong>${this.playlistTitle}</strong>`
    },
    alsoText () {
      return this.$t(
        'shared.playlist.delete.also'
      )
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
