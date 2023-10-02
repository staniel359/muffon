<template>
  <Component
    :is="component"
    class="ui base-link-container cursor-pointer"
    :to="link"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click.exact.stop="handleClick"
    @click.ctrl.exact.stop="handleCtrlClick"
    @auxclick.exact.stop="handleMiddleClick"
  >
    <slot />
  </Component>
</template>

<script>
import newTabMixin from '@/mixins/newTabMixin'

export default {
  name: 'BaseLinkContainer',
  mixins: [
    newTabMixin
  ],
  props: {
    link: Object
  },
  emits: [
    'click',
    'activeChange'
  ],
  computed: {
    component () {
      if (this.link) {
        return 'RouterLink'
      } else {
        return 'a'
      }
    },
    path () {
      return this.link?.path
    }
  },
  methods: {
    handleMouseEnter () {
      this.$emit(
        'activeChange',
        true
      )
    },
    handleMouseLeave () {
      this.$emit(
        'activeChange',
        false
      )
    },
    handleClick () {
      this.$emit(
        'click'
      )
    },
    handleCtrlClick () {
      this.openPathInNewTab()
    },
    handleMiddleClick () {
      this.openPathInNewTab()
    },
    openPathInNewTab () {
      if (this.path) {
        this.openNewTab(
          {
            path: this.path
          }
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
