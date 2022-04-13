<template>
  <div
    class="ui input"
    :class="{
      inverted: isDarkMode,
      icon
    }"
  >
    <input
      ref="input"
      class="prompt"
      :value="modelValue"
      :placeholder="placeholder"
      @input="handleInput"
      @keypress.enter="handleEnterPress"
    >

    <i
      v-if="icon"
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
  name: 'BaseInput',
  props: {
    modelValue: String,
    icon: String,
    placeholder: String
  },
  emits: [
    'update:modelValue',
    'enterPress'
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
    handleInput (
      event
    ) {
      const {
        value
      } = event.target

      this.$emit(
        'update:modelValue',
        value
      )
    },
    handleEnterPress () {
      this.$emit(
        'enterPress'
      )
    },
    focus () {
      this.$refs
        .input
        .focus()
    },
    unfocus () {
      this.$refs
        .input
        .blur()
    }
  }
}
</script>

<style lang="sass" scoped></style>
