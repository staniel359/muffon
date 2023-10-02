<template>
  <div class="content">
    <p
      class="main-text-section main-text-container"
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
          class="main-text-section main-formatted-text-container"
          v-html="alsoTextItem"
        />
      </template>
      <p
        v-else
        class="main-text-section main-text-container"
        v-text="alsoText"
      />
    </template>

    <p
      class="main-text-section main-text-container"
    >
      <strong
        v-text="undoText"
      />
    </p>

    <p
      class="main-text-section main-text-container"
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

<style lang="sass" scoped></style>
