<template>
  <Component
    :is="tag"
    class="ui header main-header"
    :class="{
      inverted: isDarkMode,
      'base-page-header': isPage
    }"
    @click="handleClick"
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
.base-page-header
  @extend .d-flex, .flex-column, .align-items-center
  & > .icon,
  & > .icons
    @extend .no-margin
    margin-bottom: 0.2em !important
</style>
