<template>
  <p
    class="main-description"
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
</template>

<script>
export default {
  name: 'BaseDescription',
  props: {
    description: {
      type: String,
      required: true
    },
    isModal: Boolean,
    isMore: Boolean
  },
  emits: [
    'moreClick'
  ],
  computed: {
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
