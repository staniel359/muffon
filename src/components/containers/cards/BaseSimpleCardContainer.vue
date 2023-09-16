<template>
  <div
    class="ui basic card base-simple-card"
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
.base-simple-card
  @extend .h-100, .background-transparent
  &.disabled
    @extend .text-color-black
    &.inverted
      @extend .text-color-white
  :deep(.main-options-popup-container)
    @extend .absolute, .visibility-hidden
    z-index: 10
    top: 10px
  &:hover
    :deep(.main-options-popup-container)
      @extend .visibility-visible
  :deep(.content)
    @extend .no-padding, .no-border
    .extra
      line-height: 1.2em
      margin-top: 0.2em
    .description
      line-height: 1.2em
      margin-top: 0.2em
    .main-self-icons
      margin-top: 0.2em
    .icon
      &.star
        opacity: 1 !important
        cursor: unset !important
  :deep(.main-image-container)
    margin-bottom: 0.5em
[dir="ltr"]
  .base-simple-card
    :deep(.main-options-popup-container)
      right: 10px
[dir="rtl"]
  .base-simple-card
    :deep(.main-options-popup-container)
      left: 10px
</style>
