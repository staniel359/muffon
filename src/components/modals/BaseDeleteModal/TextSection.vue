<template>
  <div class="content">
    <p
      class="text-section"
      v-html="goingText"
    />

    <template
      v-if="isWithAlsoText"
    >
      <template
        v-if="isAlsoTextArray"
      >
        <p
          v-for="(alsoTextItem, index) in alsoText"
          :key="index"
          class="text-section main-text-container"
          v-html="alsoTextItem"
        />
      </template>
      <p
        v-else
        class="text-section"
        v-text="alsoText"
      />
    </template>

    <p
      class="text-section"
    >
      <strong
        v-text="undoText"
      />
    </p>

    <p
      v-text="sureText"
    />
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
      return `
        <strong>
          ${this.modelName}
        </strong>
      `
    },
    parentModelNameStrong () {
      return `
        <strong>
          ${this.parentModelName}
        </strong>
      `
    },
    isAlsoTextArray () {
      return this.alsoText instanceof Array
    },
    alsoText () {
      return this.$tm(
        [
          'modals.delete.also',
          this.modelType,
          this.model
        ].filter(
          e => e
        ).join(
          '.'
        )
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

<style lang="sass" scoped>
.text-section
  margin-bottom: 0.5em !important
</style>
