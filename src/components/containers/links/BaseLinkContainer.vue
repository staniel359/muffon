<template>
  <Component
    :is="component"
    class="ui base-link-container cursor-pointer"
    :to="link"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click.exact.stop="handleClick"
    @click.ctrl.prevent.stop="handleCtrlClick"
    @auxclick.prevent.stop="handleAuxClick"
  >
    <slot />
  </Component>
</template>

<script>
import linkMixin from '@/mixins/linkMixin'

export default {
  name: 'BaseLinkContainer',
  mixins: [
    linkMixin
  ]
}
</script>

<style lang="sass" scoped></style>
