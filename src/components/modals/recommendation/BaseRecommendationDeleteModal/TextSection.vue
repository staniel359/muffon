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
    artistName: {
      type: String,
      required: true
    }
  },
  computed: {
    goingText () {
      return this.$t(
        'shared.recommendation.delete.going',
        { artistName: this.artistNameStrong }
      )
    },
    artistNameStrong () {
      return `<strong>${this.artistName}</strong>`
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
