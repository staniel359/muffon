<template>
  <div
    class="ui basic label main-label"
    :class="{
      inverted: isDarkMode,
      reversed: isReverse
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

      <template v-if="text">
        {{ text }}
      </template>
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
    isLoading: Boolean
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
</style>
