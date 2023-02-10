<template>
  <Component
    :is="component"
    class="ui label main-label"
    :class="{
      inverted: isInvertable && isDarkMode,
      icon: icon && !text,
      'right icon': icon && text && isReverse,
      'with-text': text,
      clickable: isClickable || link
    }"
    :link="link"
    @click="handleClick"
  >
    <div
      v-if="isLoading"
      class="ui mini active inline loader"
    />
    <template
      v-else
    >
      <BaseIcon
        v-if="icon && !isReverse"
        :icon="icon"
        @click="handleIconClick"
      />

      <span
        v-if="text"
        v-text="text"
      />

      <BaseIcon
        v-if="icon && isReverse"
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

export default {
  name: 'BaseLabel',
  components: {
    BaseLinkContainer,
    BaseIcon
  },
  props: {
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

<style lang="sass" scoped></style>
