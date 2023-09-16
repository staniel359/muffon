<template>
  <div class="full-size-toggle-button">
    <BaseButton
      class="basic compact circular"
      :icon="icon"
      :is-transparent="false"
      @click="handleClick"
    />
  </div>
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'FullSizeToggleButton',
  components: {
    BaseButton
  },
  props: {
    isFullSize: {
      type: Boolean,
      required: true
    }
  },
  emits: [
    'click'
  ],
  computed: {
    icon () {
      return `clockwise rotated ${this.iconAction} alternate`
    },
    iconAction () {
      if (this.isFullSize) {
        return 'compress'
      } else {
        return 'expand'
      }
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
.full-size-toggle-button
  @extend .absolute, .d-none
  bottom: 1em
[dir="ltr"]
  .full-size-toggle-button
    right: 1em
[dir="rtl"]
  .full-size-toggle-button
    left: 1em
</style>
