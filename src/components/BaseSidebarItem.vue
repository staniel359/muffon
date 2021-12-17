<template>
  <BaseLinkContainer
    class="item main-sidebar-item"
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
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer from '@/containers/links/BaseLinkContainer.vue'
import BaseHeader from '@/BaseHeader.vue'

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
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="sass" scoped></style>
