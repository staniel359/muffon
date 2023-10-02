<template>
  <Component
    :is="component"
    class="ui label base-label"
    :class="{
      inverted: (
        isInvertable && isDarkMode
      ),
      icon,
      'with-text': text,
      clickable: (
        isClickable || link
      ),
      [transparentClass]: (
        isChangeTransparency &&
        isInvertable
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
        v-if="icon"
        class="main-icon"
        :icon="icon"
      />

      <BaseIcon
        v-if="leftIcon"
        class="main-list-left-small-icon"
        :icon="leftIcon"
      />

      <span
        v-if="text"
        v-text="text"
      />

      <BaseIcon
        v-if="rightIcon"
        class="main-list-right-small-icon"
        :icon="rightIcon"
      />

      <BaseIcon
        v-if="isClearable"
        class="main-list-right-small-icon"
        icon="clear"
        @click="handleClearIconClick"
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
    leftIcon: String,
    rightIcon: String,
    text: String,
    isLoading: Boolean,
    link: Object,
    isClickable: Boolean,
    isWithArtistsCount: Boolean,
    counter: Number,
    isClearable: Boolean
  },
  emits: [
    'click',
    'clearIconClick'
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
    handleClearIconClick () {
      this.$emit(
        'clearIconClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
