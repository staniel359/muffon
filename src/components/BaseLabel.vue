<template>
  <div
    class="ui basic label main-label"
    :class="{ inverted: isDarkMode }"
    @click="handleClick"
  >
    <div
      v-if="isLoading"
      class="ui mini active inline loader"
    ></div>

    <template v-else>
      <i
        v-if="icon && !isReverse"
        class="icon"
        :class="icon"
        @click="handleIconClick"
      />

      <span
        v-if="text"
        class="label-text"
      >
        {{ text }}
      </span>

      <i
        v-if="icon && isReverse"
        class="icon"
        :class="icon"
        @click="handleIconClick"
      />
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
  emits: [
    'click',
    'iconClick'
  ],
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
  },
  methods: {
    handleClick () {
      this.$emit('click')
    },
    handleIconClick () {
      this.$emit('iconClick')
    }
  }
}
</script>

<style lang="sass" scoped>
.label-text
  @extend .cursor-default
</style>
