<template>
  <div
    class="ui basic card base-simple-card height-100 background-transparent"
    :class="{
      inverted: isDarkMode
    }"
  >
    <slot />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'

export default {
  name: 'BaseSimpleCardContainer',
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    )
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/styles/Shared.sass'

.base-simple-card
  &.disabled
    @extend .text-color-black
    &.inverted
      @extend .text-color-white
  :deep(.main-options-popup-container)
    @extend .absolute, .visibility-hidden
    z-index: 10
    top: 0.5rem
  &:hover
    :deep(.main-options-popup-container)
      @extend .visibility-visible
  :deep(.content)
    @extend .no-padding, .no-border
    .extra
      line-height: 1.3rem
      margin-top: 0.25rem
    .description
      line-height: 1rem
      margin-top: 0.4rem
    .main-self-icons
      margin-top: 0.4rem
    .icon
      &.star
        opacity: 1 !important
        cursor: unset !important
  :deep(.main-image-container)
    @extend .main-top-mini-section
[dir="ltr"]
  .base-simple-card
    :deep(.main-options-popup-container)
      right: 0.5rem
[dir="rtl"]
  .base-simple-card
    :deep(.main-options-popup-container)
      left: 0.5rem
</style>
