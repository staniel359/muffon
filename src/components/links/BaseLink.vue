<template>
  <Component
    :is="component"
    class="ui main-link"
    :to="link"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click.exact.stop="handleClick"
    @click.ctrl.prevent.stop="handleCtrlClick"
    @auxclick.prevent.stop="handleAuxClick"
  >
    <span
      v-html="text"
    />
  </Component>
</template>

<script>
import linkMixin from '@/mixins/linkMixin'

export default {
  name: 'BaseLink',
  mixins: [
    linkMixin
  ],
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped></style>
