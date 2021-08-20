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
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'TextSection',
  props: {
    model: {
      type: String,
      required: true
    },
    modelFullTitle: {
      type: String,
      required: true
    }
  },
  computed: {
    goingFormatted () {
      return localize(
        'shared.library.delete.going',
        { modelFullTitle: this.modelFullTitleFormatted }
      )
    },
    modelFullTitleFormatted () {
      return `<strong>${this.modelFullTitle}</strong>`
    },
    isArtistOrAlbum () {
      return (
        this.model === 'artist' ||
          this.model === 'album'
      )
    },
    alsoFormatted () {
      return localize(
        `shared.library.delete.${this.model}.also`
      )
    },
    undoFormatted () {
      return localize(
        'shared.library.delete.undo'
      )
    },
    sureFormatted () {
      return localize(
        'shared.library.delete.sure'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
