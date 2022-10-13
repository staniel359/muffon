<template>
  <Component
    :is="component"
    class="item main-sidebar-item"
    :class="{
      inverted: isDarkMode,
      'router-link-active': isMatchedPath
    }"
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
import {
  mapState
} from 'vuex'
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'

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
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    ),
    component () {
      if (this.link) {
        return 'BaseLinkContainer'
      } else {
        return 'a'
      }
    },
    isMatchedPath () {
      return this.currentPath.includes(
        this.path
      )
    },
    currentPath () {
      return this.$route.path
    },
    path () {
      return this.link?.path
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
