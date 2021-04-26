<template>
  <component
    class="ui header main-header"
    :is="tag"
    :class="{ inverted: isDarkMode }"
  >
    <i
      v-if="icon"
      class="icon"
      :class="icon"
    />

    <div class="content">
      <slot></slot>
    </div>
  </component >
</template>

<script>
import { mapState } from 'vuex'

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
    ...mapState('layout', [
      'isDarkMode'
    ])
  }
}
</script>

<style lang="sass" scoped></style>
