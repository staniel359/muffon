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

export default {
  name: 'BaseRetryButton',
  components: {
    BaseButton
  },
  emits: [
    'click'
  ],
  computed: {
    textFormatted () {
      return this.$t(
        'buttons.retry'
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
