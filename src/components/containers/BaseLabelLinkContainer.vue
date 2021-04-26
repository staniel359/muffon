<template>
  <BaseLinkContainer
    class="ui basic label"
    :class="{ inverted: isInverted ?? isDarkMode }"
    :link="link"
  >
    <slot></slot>
  </BaseLinkContainer>
</template>

<script>
import { mapState } from 'vuex'
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'

export default {
  name: 'BaseLabelLinkContainer',
  components: {
    BaseLinkContainer
  },
  props: {
    isInverted: {
      type: Boolean,
      default: null
    },
    link: Object
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
  }
}
</script>

<style lang="sass" scoped></style>
