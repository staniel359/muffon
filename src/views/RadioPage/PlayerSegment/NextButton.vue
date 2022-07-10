<template>
  <div class="next-button-container">
    <BaseButton
      class="basic compact next-button"
      icon="forward right"
      :text="nextText"
      is-reverse
      @click="handleClick"
    />
  </div>
</template>

<script>
import BaseButton from '*/components/buttons/BaseButton.vue'

export default {
  name: 'NextButton',
  components: {
    BaseButton
  },
  emits: [
    'click'
  ],
  computed: {
    nextText () {
      return this.$t(
        'actions.next'
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

<style lang="sass" scoped>
.next-button-container
  @extend .d-flex, .justify-content-flex-end

.next-button
  @extend .no-margin
</style>
