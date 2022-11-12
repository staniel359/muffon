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
        v-if="counter"
        class="detail"
      >
        <BaseIcon
          icon="microphone alternate"
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
} from 'vuex'
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
    counter: Number
  },
  emits: [
    'iconClick'
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
        return 'div'
      }
    }
  },
  methods: {
    handleIconClick () {
      this.$emit(
        'iconClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
