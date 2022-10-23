<template>
  <Component
    :is="tag"
    class="ui header main-header"
    :class="{
      inverted: isInverted || isDarkMode
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
import BaseIcon from '@/components/icons/BaseIcon.vue'

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
    icon: String,
    isInverted: Boolean
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
