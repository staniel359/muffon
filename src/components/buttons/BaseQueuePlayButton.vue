<template>
  <BaseButton
    class="primary"
    left-icon="play"
    :text="buttonText"
    :is-loading="isLoading"
    :is-error="!!error"
    :is-invertable="false"
    @click="handleClick"
  />
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'BaseQueuePlayButton',
  components: {
    BaseButton
  },
  props: {
    isLoading: Boolean,
    error: Error
  },
  emits: [
    'click'
  ],
  computed: {
    buttonText () {
      return this.$t(
        'actions.play'
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
