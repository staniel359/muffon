<template>
  <div
    :class="[
      'ui raised horizontal card',
      'main-horizontal-card',
      {
        inverted: isDarkMode
      }
    ]"
  >
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'

export default {
  name: 'BaseHorizontalCardContainer',
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    )
  }
}
</script>

<style lang="sass" scoped></style>
