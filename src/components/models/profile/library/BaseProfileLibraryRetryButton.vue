<template>
  <BaseButton
    class="fluid retry-button"
    icon="redo alternate"
    :text="textFormatted"
    @click="handleClick"
  />
</template>

<script>
import BaseButton from '@/BaseButton.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'BaseProfileLibraryRetryButton',
  components: {
    BaseButton
  },
  emits: [
    'click'
  ],
  computed: {
    textFormatted () {
      return localize(
        'pages.library.add.buttons.retry'
      )
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="sass" scoped>
.retry-button
  @extend .no-margin
  margin-top: 1em !important
</style>
