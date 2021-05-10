<template>
  <p>
    {{ description }}

    <strong
      v-if="isMore"
      class="main-link"
      @click="handleViewMore"
    >
      {{ readMoreFormatted }}
    </strong>
  </p>
</template>

<script>
import { localize } from '#/actions/plugins/i18n'

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
    'viewMore'
  ],
  computed: {
    readMoreFormatted () {
      return localize('shared.readMore')
    }
  },
  methods: {
    handleViewMore () {
      this.$emit('viewMore')
    }
  }
}
</script>

<style lang="sass" scoped></style>
