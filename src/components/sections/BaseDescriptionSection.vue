<template>
  <Component
    :is="component"
  >
    <p
      class="base-description"
      :class="{
        'main-text-container': isModal
      }"
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

<style lang="sass" scoped>
.base-description
  @extend .word-break-break-word
</style>
