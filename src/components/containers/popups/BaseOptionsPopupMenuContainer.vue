<template>
  <div
    class="ui scrolling dropdown main-dropdown"
    :class="{
      inverted: isDarkMode
    }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      class="left menu main-popup-content-container d-block relative"
      :class="[
        transparentClass,
        {
          inverted: isDarkMode
        }
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import transparencyMixin from '@/mixins/transparencyMixin'

export default {
  name: 'BaseOptionsPopupMenuContainer',
  mixins: [
    transparencyMixin
  ],
  emits: [
    'activeChange'
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
    handleMouseEnter () {
      this.changeActive(
        true
      )
    },
    handleMouseLeave () {
      this.changeActive(
        false
      )
    },
    changeActive (
      value
    ) {
      this.$emit(
        'activeChange',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.main-popup-content-container
  margin-bottom: -4.75px !important
</style>
