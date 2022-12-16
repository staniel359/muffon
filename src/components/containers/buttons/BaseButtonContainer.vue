<template>
  <div
    class="ui button main-simple-button"
    :class="{
      inverted: isDarkMode,
      icon: !!icon && !text
    }"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <BaseIcon
      v-if="icon"
      :icon="icon"
    />

    <span
      v-if="text"
      v-text="text"
    />

    <slot />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseIcon from '@/components/icons/BaseIcon.vue'

export default {
  name: 'BaseButtonContainer',
  components: {
    BaseIcon
  },
  props: {
    icon: String,
    text: String
  },
  emits: [
    'activeChange',
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
    },
    handleMouseEnter () {
      this.$emit(
        'activeChange',
        true
      )
    },
    handleMouseLeave () {
      this.$emit(
        'activeChange',
        false
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
