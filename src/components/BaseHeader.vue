<template>
  <Component
    :is="tag"
    class="ui header main-header"
    :class="{
      inverted: isDarkMode
    }"
    v-text="text"
  />
</template>

<script>
import {
  mapState
} from 'vuex'

export default {
  name: 'BaseHeader',
  props: {
    tag: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
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
