<template>
  <div class="content">
    <p
      v-html="goingFormatted"
    ></p>

    <p v-if="isArtistOrAlbum">
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
    model: {
      type: String,
      required: true
    },
    modelTitle: {
      type: String,
      required: true
    }
  },
  computed: {
    goingFormatted () {
      return this.$t(
        'shared.library.delete.going',
        { modelTitle: this.modelTitleFormatted }
      )
    },
    modelTitleFormatted () {
      return `<strong>${this.modelTitle}</strong>`
    },
    isArtistOrAlbum () {
      return (
        this.model === 'artist' ||
          this.model === 'album'
      )
    },
    alsoFormatted () {
      return this.$t(
        `shared.library.delete.${this.model}.also`
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
