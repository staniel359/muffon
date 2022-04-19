<template>
  <div
    class="ui basic label main-label"
    :class="{
      inverted: isDarkMode
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
