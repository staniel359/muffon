<template>
  <p>
    {{ description }}

    <a
      v-if="isMore"
      class="main-link"
      href=""
      @click.prevent="handleViewMore"
    >
      {{ readMoreFormatted }}
    </a>
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
