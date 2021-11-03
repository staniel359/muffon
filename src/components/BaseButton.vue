<template>
  <div
    class="ui button main-simple-button"
    ref="button"
    :class="{
      inverted: isDarkMode,
      icon: !!icon && !text
    }"
  >
    <i
      v-if="icon"
      class="icon"
      :class="icon"
    />

    <span v-if="text">
      {{ text }}
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BaseButton',
  props: {
    icon: String,
    text: String
  },
  emits: [
    'init'
  ],
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
  },
  mounted () {
    this.$emit(
      'init',
      this.$refs.button
    )
  }
}
</script>

<style lang="sass" scoped></style>
