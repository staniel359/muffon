<template>
  <BaseLinkContainer
    class="ui basic label"
    :class="{
      inverted: isDarkMode
    }"
    :link="link"
    @click="handleClick"
  >
    <slot />
  </BaseLinkContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'

export default {
  name: 'BaseLabelLinkContainer',
  components: {
    BaseLinkContainer
  },
  props: {
    link: Object
  },
  emits: [
    'click'
  ],
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    )
  },
  methods: {
    handleClick () {
      this.$emit(
        'click'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
