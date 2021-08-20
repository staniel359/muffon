<template>
  <BaseButton
    class="fluid green save-button"
    icon="save"
    :text="textFormatted"
    @click="handleClick"
  />
</template>

<script>
import BaseButton from '@/BaseButton.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'BaseProfileLibrarySaveButton',
  components: {
    BaseButton
  },
  emits: [
    'click'
  ],
  computed: {
    textFormatted () {
      return localize(
        'pages.library.add.save'
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
.save-button
  @extend .no-margin
  margin-top: 1em !important
</style>
