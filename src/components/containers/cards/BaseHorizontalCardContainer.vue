<template>
  <div
    class="ui raised horizontal card base-horizontal-card"
    :class="{
      inverted: isDarkMode
    }"
  >
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'

export default {
  name: 'BaseHorizontalCardContainer',
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
.base-horizontal-card
  @extend .w-100, .background-transparent
  &.raised
    @extend .shadow
    &.inverted
      @extend .no-shadow, .border-inverted
</style>
