<template>
  <BaseButton
    class="circular option-button"
    :class="{
      primary: isPrimary,
      basic: isBasic,
      red: isRed,
      loading: isLoading,
      disabled: isDisabledComputed
    }"
    :left-icon="iconComputed"
    :text="text"
    :is-invertable="isInvertable"
    is-left-icon-colored
    @click="handleClick"
  />
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'BaseSettingsOptionButton',
  components: {
    BaseButton
  },
  props: {
    text: {
      type: String,
      required: true
    },
    isPrimary: Boolean,
    isDelete: Boolean,
    isDisconnect: Boolean,
    isDisabled: Boolean,
    isLoading: Boolean,
    icon: String
  },
  emits: [
    'click'
  ],
  computed: {
    iconComputed () {
      if (this.isDelete) {
        return 'delete'
      } else {
        return this.icon
      }
    },
    isBasic () {
      return this.isDisconnect
    },
    isRed () {
      return (
        this.isDelete ||
          this.isDisconnect
      )
    },
    isDisabledComputed () {
      return (
        this.isDisabled ||
          this.isLoading
      )
    },
    isInvertable () {
      return !(
        this.isPrimary ||
          this.isDelete ||
          this.isDisconnect
      )
    }
  },
  methods: {
    handleClick (
      event
    ) {
      this.$emit(
        'click',
        event
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
