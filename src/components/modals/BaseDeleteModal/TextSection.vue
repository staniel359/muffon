<template>
  <div class="content">
    <p
      v-html="goingText"
    ></p>

    <p v-if="isWithAlsoText">
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
    modelType: {
      type: String,
      required: true
    },
    model: String,
    modelName: String,
    parentModelName: String,
    isWithAlsoText: Boolean
  },
  computed: {
    goingText () {
      return this.$t(
        `modals.delete.going.${this.modelType}`,
        {
          modelName: this.modelNameStrong,
          parentModelName: this.parentModelNameStrong
        }
      )
    },
    modelNameStrong () {
      return `<strong>${this.modelName}</strong>`
    },
    parentModelNameStrong () {
      return `<strong>${this.parentModelName}</strong>`
    },
    alsoText () {
      return this.$t(
        [
          `modals.delete.also.${this.modelType}`,
          this.model
        ].filter(e => e).join('.')
      )
    },
    undoText () {
      return this.$t(
        'modals.delete.undo'
      )
    },
    sureText () {
      return this.$t(
        'modals.delete.sure'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
