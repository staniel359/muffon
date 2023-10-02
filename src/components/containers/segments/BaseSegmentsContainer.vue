<template>
  <div
    ref="segment"
    class="ui raised segments main-segments-container"
    :class="{
      inverted: isDarkMode
    }"
  >
    <slot />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import {
  focusOnPageElement
} from '@/helpers/actions/layout'

export default {
  name: 'BaseSegmentsContainer',
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    )
  },
  methods: {
    focus () {
      focusOnPageElement(
        this.$refs.segment
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
