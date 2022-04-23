<template>
  <Component
    :is="component"
    class="item main-sidebar-item"
    :link="link"
    @click="handleClick"
  >
    <div class="main-sidebar-item-icon-container">
      <BaseIcon
        :icon="`grey ${icon}`"
      />
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
import BaseIcon from '*/components/BaseIcon.vue'
import BaseHeader from '*/components/BaseHeader.vue'

export default {
  name: 'BaseSidebarItem',
  components: {
    BaseLinkContainer,
    BaseIcon,
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
      if (this.link) {
        return 'BaseLinkContainer'
      } else {
        return 'a'
      }
    }
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
