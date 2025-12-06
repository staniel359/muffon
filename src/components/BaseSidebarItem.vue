<template>
  <Component
    :is="component"
    class="item main-sidebar-item main-menu-item"
    :class="{
      inverted: isDarkMode,
      'primary active': isActive
    }"
    :link="linkData"
    @click="handleClick"
  >
    <div class="main-sidebar-item-icon-image-container">
      <BaseIcon
        v-if="icon"
        class="grey main-icon"
        :icon="icon"
      />
      <BaseImage
        v-else
        class="circular"
        :model="imageModel"
        :image="image"
      />
    </div>

    <div class="content middle-aligned main-right-extrasmall-section">
      <strong
        v-if="isTextStrong"
        v-text="text"
      />
      <span
        v-else
        v-text="text"
      />
    </div>
  </Component>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseImage from '@/components/images/BaseImage.vue'

export default {
  name: 'BaseSidebarItem',
  components: {
    BaseLinkContainer,
    BaseIcon,
    BaseImage
  },
  props: {
    text: {
      type: String,
      required: true
    },
    linkData: Object,
    icon: String,
    image: String,
    imageModel: String,
    isTextStrong: Boolean,
    isPathStrict: Boolean
  },
  emits: [
    'click'
  ],
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    component () {
      if (this.linkData) {
        return 'BaseLinkContainer'
      } else {
        return 'a'
      }
    },
    isActive () {
      return this.isMatchedPath
    },
    isMatchedPath () {
      if (this.isPathStrict) {
        return (
          this.routePath === this.linkPathFormatted
        )
      } else {
        return this.routePath.startsWith(
          this.linkPathFormatted
        )
      }
    },
    routePath () {
      return this.$route.path
    },
    linkPathFormatted () {
      if (this.linkPath) {
        return `/${this.linkPath}`
      } else {
        return null
      }
    },
    linkPath () {
      return this.linkData?.path
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

<style lang="sass" scoped>
.content
  width: 200px
  flex-shrink: 0
</style>
