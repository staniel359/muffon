<template>
  <div
    class="ui label main-label"
    :class="{
      inverted: isDarkMode,
      reversed: isReverse,
      basic: isBasic
    }"
    @click="handleClick"
  >
    <div
      v-if="isLoading"
      class="ui mini active inline loader"
    ></div>

    <template v-else>
      <i
        v-if="icon"
        class="icon"
        :class="icon"
      />

      <span
        v-if="text"
        class="label-text"
      >
        {{ text }}
      </span>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BaseLabel',
  props: {
    icon: String,
    text: String,
    isReverse: Boolean,
    isLoading: Boolean,
    isBasic: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
  }
}
</script>

<style lang="sass" scoped>
.reversed
  flex-direction: row-reverse

.label-text
  @extend .cursor-default
</style>
