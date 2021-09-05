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
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'TextSection',
  props: {
    artistName: {
      type: String,
      required: true
    }
  },
  computed: {
    goingFormatted () {
      return localize(
        'shared.recommendation.delete.going',
        { artistName: this.artistNameFormatted }
      )
    },
    artistNameFormatted () {
      return `<strong>${this.artistName}</strong>`
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
