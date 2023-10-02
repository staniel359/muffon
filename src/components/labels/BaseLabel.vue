<template>
  <Component
    :is="component"
    class="ui label base-label"
    :class="{
      inverted: (
        isInvertable && isDarkMode
      ),
      icon: (
        icon && !text
      ),
      'right icon': (
        icon && text && isReverse
      ),
      'with-text': text,
      clickable: (
        isClickable || link
      ),
      [transparentClass]: (
        isChangeTransparency && isInvertable
      )
    }"
    :link="link"
    @click="handleClick"
  >
    <BaseIcon
      v-if="isLoading"
      class="main-icon"
      is-loading
    />
    <template
      v-else
    >
      <BaseIcon
        v-if="icon && !isReverse"
        class="main-left-small-icon"
        :icon="icon"
        @click="handleIconClick"
      />

      <span
        v-if="text"
        v-text="text"
      />

      <BaseIcon
        v-if="icon && isReverse"
        class="main-right-small-icon"
        :icon="icon"
        @click="handleIconClick"
      />

      <div
        v-if="isWithArtistsCount && counter"
        class="detail"
      >
        <BaseIcon
          icon="artist"
        />

        <span
          v-text="counter"
        />
      </div>
    </template>
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
import transparencyMixin from '@/mixins/transparencyMixin'

export default {
  name: 'BaseLabel',
  components: {
    BaseLinkContainer,
    BaseIcon
  },
  mixins: [
    transparencyMixin
  ],
  props: {
    isChangeTransparency: {
      type: Boolean,
      default: true
    },
    isInvertable: {
      type: Boolean,
      default: true
    },
    icon: String,
    text: String,
    isReverse: Boolean,
    isLoading: Boolean,
    link: Object,
    isClickable: Boolean,
    isWithArtistsCount: Boolean,
    counter: Number
  },
  emits: [
    'click',
    'iconClick'
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
        return 'div'
      }
    }
  },
  methods: {
    handleClick () {
      this.$emit(
        'click'
      )
    },
    handleIconClick () {
      this.$emit(
        'iconClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/styles/Shared.sass'

.base-label
  margin: 0 0.75rem 0.75rem 0 !important
  &.large
    margin: 0 1rem 1rem 0 !important
  &:not(.clickable)
    @extend .cursor-default
    &.basic
      &.inverted
        @extend .text-color-white
  &.clickable
    @extend .cursor-pointer
    &:not(.primary)
      &:hover
        @extend .text-color-base
  &.circular
    &.with-text
      padding: 0.6rem 1.2rem !important
</style>
