<template>
  <div
    ref="button"
    class="ui button main-simple-button"
    :class="{
      inverted: isDarkMode,
      icon: !!icon && !text
    }"
    @click="handleClick"
  >
    <i
      v-if="icon && !isReverse"
      class="icon"
      :class="icon"
    />

    <span
      v-if="text"
      v-text="text"
    />

    <i
      v-if="icon && isReverse"
      class="icon"
      :class="icon"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'

export default {
  name: 'BaseButton',
  props: {
    icon: String,
    text: String,
    isReverse: Boolean
  },
  emits: [
    'init',
    'click'
  ],
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    )
  },
  mounted () {
    this.$emit(
      'init',
      this.$refs.button
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
