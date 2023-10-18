<template>
  <div class="field">
    <input
      ref="recaptcha"
      type="text"
      name="recaptcha"
      hidden
    >

    <div class="middle-aligned">
      <div
        :id="id"
      />

      <BaseButton
        class="basic circular main-right-section"
        icon="refresh"
        @click="handleRefreshButtonClick"
      />
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'BaseRecaptchaField',
  components: {
    BaseButton
  },
  props: {
    id: {
      type: String,
      required: true
    },
    value: String
  },
  emits: [
    'change',
    'refreshButtonClick'
  ],
  watch: {
    value: 'handleValueChange'
  },
  methods: {
    handleValueChange () {
      this.setInputValue()

      this.$emit(
        'change'
      )
    },
    handleRefreshButtonClick () {
      this.$emit(
        'refreshButtonClick'
      )
    },
    setInputValue () {
      this.$refs
        .recaptcha
        .value = this.value
    }
  }
}
</script>

<style lang="sass" scoped></style>
