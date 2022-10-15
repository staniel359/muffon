<template>
  <Component
    :is="component"
    class="ui main-link"
    :to="link"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click.exact.stop="handleClick"
    @click.ctrl.exact.stop="handleCtrlClick"
    @auxclick.exact.stop="handleAuxClick"
  >
    <span
      v-html="text"
    />
  </Component>
</template>

<script>
import newTabMixin from '@/mixins/newTabMixin'

export default {
  name: 'BaseLink',
  mixins: [
    newTabMixin
  ],
  props: {
    text: {
      type: String,
      required: true
    },
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
      return this.link.path
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
    handleAuxClick () {
      this.openPathInNewTab()
    },
    openPathInNewTab () {
      this.openNewTab(
        {
          path: this.path
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
