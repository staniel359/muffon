<template>
  <div
    class="ui raised horizontal card main-horizontal-card"
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

<style lang="sass" scoped></style>
