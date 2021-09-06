<template>
  <p>
    {{ description }}

    <strong
      v-if="isMore"
      class="main-link"
      @click="handleMoreClick"
    >
      {{ moreFormatted }}
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
    isMore: Boolean
  },
  emits: [
    'moreClick'
  ],
  computed: {
    moreFormatted () {
      return this.$t('shared.more')
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
