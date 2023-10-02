<template>
  <Component
    :is="tag"
    class="ui header main-header"
    :class="{
      inverted: isDarkMode,
      'middle-aligned-column': isPage
    }"
    @click="handleClick"
  >
    <BaseIcon
      v-if="icon"
      class="header-icon"
      :class="{
        'big page-icon main-icon': isPage,
        small: isIconSmall
      }"
      :icon="icon"
    />
    <IconsSection
      v-else-if="icons"
      class="header-icon"
      :class="{
        'big page-icon main-icon': isPage
      }"
      :icons="icons"
    />

    {{ text }}

    <div
      v-if="isPage"
      class="sub header page-subheader"
      v-text="subheader"
    />
  </Component>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import IconsSection from './BaseHeader/IconsSection.vue'

export default {
  name: 'BaseHeader',
  components: {
    BaseIcon,
    IconsSection
  },
  props: {
    tag: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    icon: String,
    icons: Array,
    isPage: Boolean,
    subheader: String,
    isIconSmall: Boolean
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
    )
  },
  methods: {
    handleClick (
      event
    ) {
      this.$emit(
        'click',
        event
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.page-icon
  margin-bottom: 0.2rem !important

.page-subheader
  margin-top: 0.25rem !important
</style>
