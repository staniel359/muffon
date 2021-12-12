<template>
  <div class="content">
    <p
      v-html="goingText"
    ></p>

    <p v-if="isArtistOrAlbum">
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
    goingText () {
      return this.$t(
        'shared.library.delete.going',
        { modelTitle: this.modelTitleStrong }
      )
    },
    modelTitleStrong () {
      return `<strong>${this.modelTitle}</strong>`
    },
    isArtistOrAlbum () {
      return (
        this.model === 'artist' ||
          this.model === 'album'
      )
    },
    alsoText () {
      return this.$t(
        `shared.library.delete.${this.model}.also`
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
