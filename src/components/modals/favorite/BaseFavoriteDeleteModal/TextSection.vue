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
    modelName: {
      type: String,
      required: true
    }
  },
  computed: {
    goingText () {
      return this.$t(
        'shared.favorite.delete.going',
        { modelName: this.modelNameStrong }
      )
    },
    modelNameStrong () {
      return `<strong>${this.modelName}</strong>`
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
