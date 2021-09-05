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
    modelTitle: {
      type: String,
      required: true
    }
  },
  computed: {
    goingFormatted () {
      return localize(
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
      return localize(
        `shared.library.delete.${this.model}.also`
      )
    },
    undoFormatted () {
      return localize(
        'shared.modal.undo'
      )
    },
    sureFormatted () {
      return localize(
        'shared.modal.sure'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
