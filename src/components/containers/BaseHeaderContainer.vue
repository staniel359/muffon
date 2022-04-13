<template>
  <Component
    :is="tag"
    class="ui header main-header"
    :class="{
      inverted: isDarkMode
    }"
  >
    <i
      v-if="icon"
      class="icon"
      :class="icon"
    />

    <slot />
  </Component>
</template>

<script>
import {
  mapState
} from 'vuex'

export default {
  name: 'BaseHeaderContainer',
  props: {
    tag: {
      type: String,
      required: true
    },
    icon: String
  },
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
