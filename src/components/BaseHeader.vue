<template>
  <Component
    :is="tag"
    class="ui header main-header"
    :class="{
      inverted: isDarkMode,
      'main-page-header': isPage
    }"
  >
    <BaseIcon
      v-if="icon"
      :class="{
        big: isPage
      }"
      :icon="icon"
    />
    <IconsSection
      v-else-if="icons"
      :icons="icons"
      :is-page="isPage"
    />

    {{ text }}

    <div
      v-if="isPage"
      class="sub header"
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
    subheader: String
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    )
  }
}
</script>

<style lang="sass" scoped></style>
