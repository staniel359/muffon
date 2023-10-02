<template>
  <Component
    :is="component"
  >
    <p
      :class="textClass"
    >
      {{ description }}

      <strong
        v-if="isMore"
        class="main-link"
        @click="handleMoreClick"
        v-text="moreText"
      />
    </p>
  </Component>
</template>

<script>
export default {
  name: 'BaseDescriptionSection',
  props: {
    description: {
      type: String,
      required: true
    },
    isModal: Boolean,
    isMore: Boolean,
    isSmall: Boolean
  },
  emits: [
    'moreClick'
  ],
  computed: {
    component () {
      if (this.isSmall) {
        return 'small'
      } else {
        return 'div'
      }
    },
    textClass () {
      if (this.isSmall) {
        return 'main-small-text-container'
      } else if (this.isModal) {
        return 'main-formatted-text-container'
      } else {
        return 'main-text-container'
      }
    },
    moreText () {
      return this.$t(
        'more'
      )
    }
  },
  methods: {
    handleMoreClick () {
      this.$emit(
        'moreClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
