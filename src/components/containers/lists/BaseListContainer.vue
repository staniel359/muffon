<template>
  <div
    class="ui list base-list"
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
  name: 'BaseListContainer',
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

.base-list
  &.selection
    & > :deep(.item)
      border-radius: 1rem
  &.inverted
    & > :deep(.item)
      & > .content
        @extend .text-color-white
      &.disabled
        @extend .text-color-white
    &.selection
      & > :deep(.item)
        &:hover
          .left-icon
            @extend .text-color-white
  & > :deep(.item)
    &.disabled
      @extend .text-color-black
      opacity: 0.45
</style>
