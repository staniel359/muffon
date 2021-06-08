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
    'moreClick'
  ],
  computed: {
    moreFormatted () {
      return localize('shared.more')
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
