<template>
  <div class="main-bottom-section end-aligned">
    <BaseButton
      ref="button"
      class="basic circular compact"
      icon="audioNext"
      :text="nextText"
      is-reverse
      is-icon-with-rtl
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

<style lang="sass" scoped></style>
