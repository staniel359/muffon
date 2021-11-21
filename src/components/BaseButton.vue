<template>
  <div
    class="ui button main-simple-button"
    ref="button"
    :class="{
      inverted: isDarkMode,
      icon: !!icon && !text
    }"
    @click="handleClick"
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
    'init',
    'click'
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
  },
  methods: {
    handleClick () {
      this.$emit(
        'click',
        event
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
