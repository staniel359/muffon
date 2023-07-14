<template>
  <Component
    :is="tag"
    class="ui header main-header"
    :class="{
      inverted: (
        isInverted || isDarkMode
      )
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
} from 'pinia'
import layoutStore from '@/stores/layout'
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
      layoutStore,
      [
        'isDarkMode'
      ]
    )
  }
}
</script>

<style lang="sass" scoped></style>
