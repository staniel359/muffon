<template>
  <BaseButton
    class="red basic compact right floated"
    icon="close"
    :text="textFormatted"
    @click="handleClick"
  />
</template>

<script>
import BaseButton from '@/BaseButton.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'ResetButton',
  components: {
    BaseButton
  },
  emits: [
    'click'
  ],
  computed: {
    textFormatted () {
      return localize(
        'pages.album.sources.reset'
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

<style lang="sass" scoped></style>
