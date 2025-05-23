<template>
  <Component
    :is="component"
    class="item main-sidebar-item main-menu-item"
    :class="{
      inverted: isDarkMode,
      'primary active': isActive
    }"
    :link="link"
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
import {
  params as formatRouterParams
} from '@/helpers/formatters/plugins/router'

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
    link: Object,
    icon: String,
    image: String,
    imageModel: String,
    isTextStrong: Boolean
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
      if (this.link) {
        return 'BaseLinkContainer'
      } else {
        return 'a'
      }
    },
    isActive () {
      return (
        this.isPathsMatch &&
          this.isParamsMatch
      )
    },
    isPathsMatch () {
      return this.routePath.includes(
        this.linkPath
      )
    },
    routePath () {
      return this.$route.path
    },
    linkPath () {
      return this.link?.path
    },
    isParamsMatch () {
      return (
        this.routeParamsFormattedString ===
          this.linkParamsString
      )
    },
    routeParamsFormattedString () {
      return JSON.stringify(
        this.routeParamsFormatted
      )
    },
    routeParamsFormatted () {
      return formatRouterParams(
        {
          params: this.routeParams
        }
      )
    },
    routeParams () {
      return this.$route.params
    },
    linkParamsString () {
      return JSON.stringify(
        this.linkParams
      )
    },
    linkParams () {
      return this.link?.params
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
