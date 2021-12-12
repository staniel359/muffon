<template>
  <p
    :class="{ 'main-text-container': isModal }"
  >
    {{ description }}

    <strong
      v-if="isMore"
      class="main-link"
      @click="handleMoreClick"
    >
      {{ moreText }}
    </strong>
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
        'shared.more'
      )
    }
  },
  methods: {
    handleMoreClick () {
      this.$emit('moreClick')
    }
  }
}
</script>

<style lang="sass" scoped></style>
