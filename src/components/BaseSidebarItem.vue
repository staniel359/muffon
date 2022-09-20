<template>
  <Component
    :is="component"
    class="item main-sidebar-item"
    :link="link"
    @click="handleClick"
  >
    <div class="icon-container">
      <BaseIcon
        :icon="`grey ${icon}`"
      />
    </div>

    <div class="content-container">
      <span
        v-text="text"
      />
    </div>
  </Component>
</template>

<script>
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseIcon from '@/components/BaseIcon.vue'

export default {
  name: 'BaseSidebarItem',
  components: {
    BaseLinkContainer,
    BaseIcon
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
