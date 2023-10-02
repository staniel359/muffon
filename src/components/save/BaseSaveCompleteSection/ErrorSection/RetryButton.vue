<template>
  <div class="main-bottom-section">
    <BaseButton
      class="basic circular fluid"
      left-icon="retry"
      :text="retryText"
      @click="handleClick"
    />
  </div>
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'RetryButton',
  components: {
    BaseButton
  },
  emits: [
    'click'
  ],
  computed: {
    retryText () {
      return this.$t(
        'actions.retry'
      )
    }
  },
  methods: {
    handleClick () {
      this.$emit(
        'click'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
