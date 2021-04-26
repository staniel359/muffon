<template>
  <div
    class="ui button"
    ref="button"
    :class="{
      inverted: isDarkMode,
      icon
    }"
  >
    <i
      v-if="icon"
      class="icon"
      :class="icon"
    />

    <template v-if="text">
      {{ text }}
    </template>
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
    this.$emit('init', this.$refs.button)
  }
}
</script>

<style lang="sass" scoped></style>
