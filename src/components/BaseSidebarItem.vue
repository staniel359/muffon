<template>
  <Component
    class="item main-sidebar-item"
    :is="component"
    :link="link"
    @click="handleClick"
  >
    <div class="main-sidebar-item-icon-container">
      <i
        class="grey icon"
        :class="icon"
      ></i>
    </div>

    <div class="main-sidebar-item-content-container">
      <BaseHeader
        tag="h4"
        :text="text"
      />
    </div>
  </Component>
</template>

<script>
import BaseLinkContainer
  from '*/components/containers/links/BaseLinkContainer.vue'
import BaseHeader from '*/components/BaseHeader.vue'

export default {
  name: 'BaseSidebarItem',
  components: {
    BaseLinkContainer,
    BaseHeader
  },
  props: {
    icon: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    link: Object
  },
  emits: [
    'click'
  ],
  computed: {
    component () {
      return this.link
        ? 'BaseLinkContainer'
        : 'div'
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="sass" scoped></style>
