<template>
  <Component
    :is="tag"
    class="ui header main-header"
    :class="{
      inverted: isDarkMode
    }"
  >
    <BaseIcon
      v-if="icon"
      :icon="icon"
    />

    <slot />
  </Component>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseIcon from '*/components/BaseIcon.vue'

export default {
  name: 'BaseHeaderContainer',
  components: {
    BaseIcon
  },
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
