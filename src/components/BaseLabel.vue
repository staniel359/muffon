<template>
  <div
    class="ui label main-label"
    :class="{
      inverted: isInverted && isDarkMode,
      basic: isBasic,
      circular: isCircular
    }"
  >
    <div
      v-if="isLoading"
      class="ui mini active inline loader"
    />
    <template v-else>
      <BaseIcon
        v-if="icon && !isReverse"
        :icon="icon"
        @click="handleIconClick"
      />

      <span
        v-if="text"
        class="label-text"
        v-text="text"
      />

      <BaseIcon
        v-if="icon && isReverse"
        :icon="icon"
        @click="handleIconClick"
      />
    </template>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseIcon from '*/components/BaseIcon.vue'

export default {
  name: 'BaseLabel',
  components: {
    BaseIcon
  },
  props: {
    isBasic: {
      type: Boolean,
      default: true
    },
    isInverted: {
      type: Boolean,
      default: true
    },
    isCircular: Boolean,
    icon: String,
    text: String,
    isReverse: Boolean,
    isLoading: Boolean
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
    )
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

<style lang="sass" scoped>
.label-text
  @extend .cursor-default
</style>
