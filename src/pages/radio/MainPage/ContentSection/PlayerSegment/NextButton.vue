<template>
  <div class="next-button-container">
    <BaseButton
      ref="button"
      class="basic circular compact"
      icon="audioNext"
      :text="nextText"
      is-reverse
      @click="handleClick"
    />
  </div>
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'

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
    },
    click () {
      this.$refs
        .button
        .click()
    }
  }
}
</script>

<style lang="sass" scoped>
.next-button-container
  @extend .d-flex, .justify-content-flex-end
</style>
